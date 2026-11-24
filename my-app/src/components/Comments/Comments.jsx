import { useEffect, useReducer, useState } from 'react'
import { commentsReducer, initialState } from './commentsReducer'
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from '../../api/commentsApi'
import CommentsList from './CommentsList'
import AddComment from './AddComment'
import '../../css/Comments.css'

// הקומפוננטה הראשית של התגובות לפוסט אחד - עם רדיוסר משלה.
// התגובות מוסתרות בהתחלה ומובאות מהשרת רק בפעם הראשונה שפותחים אותן.
export default function Comments({ postId, user }) {
  const [state, dispatch] = useReducer(commentsReducer, initialState)
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isOpen || state.isLoaded) return

    let ignore = false
    getComments(postId)
      .then((comments) => {
        if (!ignore) dispatch({ type: 'SET_COMMENTS', payload: comments })
      })
      .catch(() => setError('טעינת התגובות נכשלה'))

    return () => {
      ignore = true
    }
  }, [postId, isOpen, state.isLoaded])

  // בכל פעולה: קודם השרת (commentsApi), ורק אם הצליח - dispatch לרדיוסר

  async function handleAdd(body) {
    try {
      // שומרים מי כתב את התגובה - לפי המשתמש הפעיל (כולל תמונת הפרופיל שלו)
      const newComment = await createComment({
        postId,
        userId: user.id,
        name: user.name,
        avatar: user.avatar,
        body,
      })
      dispatch({ type: 'ADD_COMMENT', payload: newComment })
      setError('')
    } catch {
      setError('הוספת התגובה נכשלה')
    }
  }

  async function handleEdit(id, body) {
    try {
      const updated = await updateComment(id, { body })
      dispatch({ type: 'UPDATE_COMMENT', payload: updated })
      setError('')
    } catch {
      setError('עדכון התגובה נכשל')
    }
  }

  async function handleDelete(id) {
    try {
      await deleteComment(id)
      dispatch({ type: 'DELETE_COMMENT', payload: id })
      setError('')
    } catch {
      setError('מחיקת התגובה נכשלה')
    }
  }

  return (
    <section className="comments">
      <div className="comments-header">
        <h3 className="comments-title">
          תגובות{state.isLoaded && ` (${state.comments.length})`}
        </h3>
        <button type="button" className="post-btn-outline" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'הסתרת תגובות' : 'הצגת תגובות'}
        </button>
      </div>

      {isOpen && (
        <>
          {error && <p className="posts-error">{error}</p>}
          <CommentsList
            comments={state.comments}
            currentUserId={user.id}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <AddComment onAdd={handleAdd} />
        </>
      )}
    </section>
  )
}
