import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import useCurrentUser from './hooks/useCurrentUser'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import RegisterDetails from './components/Auth/RegisterDetails'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Todos from './components/Todos/Todos'
import Posts from './components/Posts/Posts'
import Albums from './components/Albums/Albums'

function App() {
  // המשתמש המחובר (מה-localStorage). null = אף אחד לא מחובר
  const { user, login, logout } = useCurrentUser()
  const myPage = user ? `/${user.username}` : '/login'

  return (
    <BrowserRouter>
      <Routes>
        {/* כתובת ריקה: מחובר - לעמוד שלו, לא מחובר - לכניסה */}
        <Route path="/" element={<Navigate to={myPage} replace />} />

        {/* כניסה והרשמה - רק למי שלא מחובר */}
        <Route
          path="/login"
          element={user ? <Navigate to={myPage} replace /> : <Login onLogin={login} />}
        />
        <Route path="/register" element={user ? <Navigate to={myPage} replace /> : <Register />} />
        <Route
          path="/register/details"
          element={user ? <Navigate to={myPage} replace /> : <RegisterDetails onLogin={login} />}
        />

        {/* כל העמודים של המשתמש מוצגים בתוך ה-Layout (במקום ה-Outlet). לא מחובר - לכניסה */}
        <Route
          path="/:username"
          element={user ? <Layout user={user} onLogout={logout} /> : <Navigate to="/login" replace />}
        >
          <Route index element={<Home user={user} />} />
          <Route path="todos" element={<Todos userId={user?.id} />} />
          {/* הפוסטים שלי: /Bret/posts, ופוסט נבחר: /Bret/posts/4 */}
          <Route path="posts" element={<Posts user={user} view="mine" />} />
          <Route path="posts/:postId" element={<Posts user={user} view="mine" />} />
          {/* כל הפוסטים (AllPosts): /Bret/allposts, ופוסט נבחר: /Bret/allposts/7 */}
          <Route path="allposts" element={<Posts user={user} view="all" />} />
          <Route path="allposts/:postId" element={<Posts user={user} view="all" />} />
          {/* אלבומים: /Bret/albums, ואלבום נבחר: /Bret/albums/2/photos */}
          <Route path="albums" element={<Albums user={user} />} />
          <Route path="albums/:albumId" element={<Navigate to="photos" replace />} />
          <Route path="albums/:albumId/photos" element={<Albums user={user} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
