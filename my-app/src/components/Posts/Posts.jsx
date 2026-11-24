import { useEffect, useReducer, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { postsReducer, initialState } from './postsReducer'
import { getPosts, getAllPosts, createPost, updatePost, deletePost } from '../../api/postsApi'
import PostsSidebar from './PostsSidebar'
import PostView from './PostView'
import Comments from '../Comments/Comments'
import '../../css/Posts.css'

// הקומפוננטה הראשית של הפוסטים.
// מחזיקה את הרדיוסר ומדברת עם השרת, ומרנדרת שלוש קומפוננטות משנה:
// 1. PostsSidebar - חלוקה (שלי / כולם) + חיפוש + רשימה + פוסט חדש
// 2. PostView     - הצגת הפוסט שנבחר
// 3. Comments     - התגובות של הפוסט שנבחר (עם רדיוסר משלהן)
//
// התצוגה (שלי / כולם) מגיעה מ-App לפי הכתובת, והפוסט שנבחר - מהכתובת עצמה:
//   /Bret/posts        - הפוסטים שלי        (view="mine")
//   /Bret/posts/4      - הפוסטים שלי, פוסט 4 נבחר
//   /Bret/allposts     - כל הפוסטים         (view="all")
//   /Bret/allposts/7   - כל הפוסטים, פוסט 7 נבחר
export default function Posts({ user, view = 'mine' }) {
  const [state, dispatch] = useReducer(postsReducer, initialState)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { postId } = useParams()

  // בונה כתובת של עמוד הפוסטים לפי פוסט ותצוגה
  function postsUrl(id, newView = view) {
    const page = newView === 'all' ? 'allposts' : 'posts'
    const idPart = id ? `/${id}` : ''
    return `/${user.username}/${page}${idPart}`
  }

  // טעינת הפוסטים מהשרת - בפתיחת העמוד ובכל מעבר בין "שלי" ל"כולם"
  useEffect(() => {
    let ignore = false // אם עברו לתצוגה אחרת לפני שהתשובה הגיעה - מתעלמים ממנה
    const request = view === 'mine' ? getPosts(user.id) : getAllPosts()

    request
      .then((posts) => {
        if (!ignore) dispatch({ type: 'SET_POSTS', payload: posts })
      })
      .catch(() => setError('טעינת הפוסטים נכשלה'))

    return () => {
      ignore = true
    }
  }, [user.id, view])

  // בכל פעולה: קודם השרת (postsApi), ורק אם הצליח - dispatch לרדיוסר

  async function handleAdd({ title, body }) {
    try {
      const newPost = await createPost({ userId: user.id, title, body })
      dispatch({ type: 'ADD_POST', payload: newPost })
      setError('')
      navigate(postsUrl(newPost.id)) // הפוסט החדש נבחר להצגה
    } catch {
      setError('הוספת הפוסט נכשלה')
    }
  }

  async function handleEdit(id, changes) {
    try {
      const updated = await updatePost(id, changes)
      dispatch({ type: 'UPDATE_POST', payload: updated })
      setError('')
    } catch {
      setError('עדכון הפוסט נכשל')
    }
  }

  async function handleDelete(id) {
    try {
      await deletePost(id)
      dispatch({ type: 'DELETE_POST', payload: id })
      setError('')
      navigate(postsUrl(null)) // הפוסט שהוצג נמחק - חוזרים לרשימה
    } catch {
      setError('מחיקת הפוסט נכשלה')
    }
  }

  // בחירת פוסט ומעבר תצוגה - רק משנים את הכתובת
  function handleSelect(id) {
    navigate(postsUrl(id))
  }

  function handleViewChange(newView) {
    navigate(postsUrl(null, newView))
  }

  // ה-id בכתובת הוא טקסט, ולכן משווים כטקסט
  const selectedPost = state.posts.find((p) => String(p.id) === postId)

  return (
    <section className="posts">
      <PostsSidebar
        view={view}
        onViewChange={handleViewChange}
        posts={state.posts}
        selectedId={selectedPost?.id}
        onSelect={handleSelect}
        onAdd={handleAdd}
      />

      <div className="posts-main">
        {error && <p className="posts-error">{error}</p>}

        {selectedPost ? (
          <>
            <PostView
              post={selectedPost}
              isMine={selectedPost.userId === user.id}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            {/* key - כדי שבמעבר לפוסט אחר התגובות יתחילו מאפס */}
            <Comments key={selectedPost.id} postId={selectedPost.id} user={user} />
          </>
        ) : (
          <p className="posts-empty">בחרו פוסט מהרשימה כדי לקרוא אותו</p>
        )}
      </div>
    </section>
  )
}
