import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUserByUsername } from '../../api/usersApi'
import AuthLayout from './AuthLayout'
import AuthField from './AuthField'

// עמוד ההרשמה, שלב 1 - /register
// אם שם המשתמש פנוי והסיסמאות תואמות - עוברים לשלב 2 (/register/details)
// עם שם המשתמש והסיסמה. המשתמש עוד לא נשמר בשרת בשלב הזה.
export default function Register() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [verify, setVerify] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    const name = username.trim()

    if (!name || !password) {
      setError('יש למלא שם משתמש וסיסמה')
      return
    }
    if (password !== verify) {
      setError('הסיסמאות לא תואמות')
      return
    }

    try {
      const existing = await getUserByUsername(name)
      if (existing.length > 0) {
        setError('שם המשתמש תפוס')
        return
      }
      navigate('/register/details', { state: { username: name, password } })
    } catch {
      setError('אין חיבור לשרת, נסו שוב')
    }
  }

  return (
    <AuthLayout variant="register">
      <form className="auth-card" onSubmit={handleSubmit}>
        <span className="auth-badge">/register</span>
        <h1 className="auth-title">הרשמה</h1>

        <AuthField label="שם משתמש" value={username} onChange={setUsername} autoComplete="username" />
        <AuthField
          label="סיסמה"
          type="password"
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
        />
        <AuthField
          label="אימות סיסמה"
          type="password"
          value={verify}
          onChange={setVerify}
          autoComplete="new-password"
        />

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" className="auth-btn">
          המשך
        </button>

        <p className="auth-switch">
          כבר רשומים? <Link to="/login">כניסה</Link>
        </p>
      </form>
    </AuthLayout>
  )
}
