import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUserByUsername } from '../../api/usersApi'
import AuthLayout from './AuthLayout'
import AuthField from './AuthField'

// עמוד הכניסה - /login
// onLogin - שומר את המשתמש (localStorage) ומגיע מ-App
export default function Login({ onLogin }) {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      // מביאים את המשתמש לפי שם המשתמש, ובודקים שהסיסמה תואמת לשדה password
      const [user] = await getUserByUsername(username.trim())
      if (!user || user.password !== password) {
        setError('שם משתמש או סיסמה שגויים')
        return
      }
      onLogin(user)
      navigate(`/${user.username}`)
    } catch {
      setError('אין חיבור לשרת, נסו שוב')
    }
  }

  return (
    <AuthLayout variant="login">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1 className="auth-title">ברוכים השבים</h1>

        <AuthField label="שם משתמש" value={username} onChange={setUsername} autoComplete="username" />
        <AuthField
          label="סיסמה"
          type="password"
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
        />

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" className="auth-btn">
          כניסה
        </button>

        <p className="auth-switch">
          עוד אין לך חשבון? <Link to="/register">הרשמה</Link>
        </p>
      </form>
    </AuthLayout>
  )
}
