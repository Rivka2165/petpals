import { useEffect, useState } from 'react'
import { getTodos } from '../../api/todosApi'
import { getPosts } from '../../api/postsApi'
import { getAlbums } from '../../api/albumsApi'
import Avatar from '../common/Avatar'
import HomeCard from './HomeCard'
import '../../css/Home.css'

// עמוד הבית: ברכה עם שם המשתמש + שלושה כרטיסים לעמודי האפליקציה
export default function Home({ user }) {
  const [counts, setCounts] = useState({ todos: null, posts: null, albums: null })

  // כמה משימות / פוסטים / אלבומים יש למשתמש - לטקסט בכרטיסים
  useEffect(() => {
    Promise.all([getTodos(user.id), getPosts(user.id), getAlbums(user.id)])
      .then(([todos, posts, albums]) =>
        setCounts({ todos: todos.length, posts: posts.length, albums: albums.length })
      )
      .catch(() => {}) // אם השרת לא זמין - הכרטיסים יוצגו בלי מספרים
  }, [user.id])

  const base = `/${user.username}`

  return (
    <div className="home">
      <section className="home-hero">
        <div>
          <p className="home-hello">ברוך הבא</p>
          <h1 className="home-name">{user.name}</h1>
        </div>
        {/* תמונת הפרופיל שהמשתמש בחר בהרשמה */}
        <Avatar avatar={user.avatar} size={125} />
      </section>

      <div className="home-cards">
        <HomeCard
          icon="cat"
          iconBg="#ffc65a"
          title="משימות"
          text={describe(counts.todos, 'משימות פרטיות')}
          to={`${base}/todos`}
        />
        <HomeCard
          icon="dog"
          iconBg="#a3e4dc"
          title="פוסטים"
          text={describe(counts.posts, 'פוסטים גלויים')}
          to={`${base}/posts`}
        />
        <HomeCard
          icon="rabbit"
          iconBg="#ffb7a3"
          title="אלבומים"
          text={describe(counts.albums, 'אלבומים פרטיים')}
          to={`${base}/albums`}
        />
      </div>
    </div>
  )
}

function describe(count, label) {
  return count === null ? label : `${count} ${label}`
}
