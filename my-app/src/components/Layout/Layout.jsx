import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import '../../css/Layout.css'

// המסגרת של כל האפליקציה:
// למעלה - הניווט, ובמקום של Outlet - העמוד הנוכחי
export default function Layout({ user, onLogout }) {
  return (
    <div className="layout">
      <Navbar user={user} onLogout={onLogout} />

      <main className="layout-main">
        <Outlet />
      </main>
    </div>
  )
}
