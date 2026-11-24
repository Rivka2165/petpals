import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import PetIcon from '../common/PetIcon'
import UserInfo from './UserInfo'

// סרגל הניווט העליון: לוגו מימין, שם המשתמש, קישורים ויציאה
export default function Navbar({ user, onLogout }) {
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const base = `/${user.username}`
  const linkClass = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')
  // "פוסטים" מסומן גם כשנמצאים ב"כל הפוסטים" (/Bret/allposts)
  const { pathname } = useLocation()
  const inAllPosts = pathname.startsWith(`${base}/allposts`)
  const postsLinkClass = ({ isActive }) => linkClass({ isActive: isActive || inAllPosts })

  return (
    <header className="navbar">
      <Link to={base} className="nav-logo">
        <PetIcon type="cat" size={44} bg="#ffc65a" />
        <span>PetPals</span>
      </Link>

      <nav className="nav-menu">
        <span className="nav-user">{user.name}</span>
        {/* מידע - פותח את חלון "הפרטים שלי" מעל העמוד */}
        <button type="button" className="nav-link" onClick={() => setIsInfoOpen(true)}>
          מידע
        </button>
        <NavLink to={`${base}/todos`} className={linkClass}>
          משימות
        </NavLink>
        <NavLink to={`${base}/posts`} className={postsLinkClass}>
          פוסטים
        </NavLink>
        <NavLink to={`${base}/albums`} className={linkClass}>
          אלבומים
        </NavLink>
        {/* יציאה - מוחקת את המשתמש מה-localStorage, ו-App מעביר לעמוד הכניסה */}
        <button type="button" className="nav-logout" onClick={onLogout}>
          יציאה
        </button>
      </nav>

      {isInfoOpen && <UserInfo user={user} onClose={() => setIsInfoOpen(false)} />}
    </header>
  )
}
