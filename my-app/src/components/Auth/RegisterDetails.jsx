import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { createUser } from '../../api/usersApi'
import AuthLayout from './AuthLayout'
import AuthField from './AuthField'
import AvatarPicker from './AvatarPicker'

const PET_TYPES = ['כלב', 'חתול', 'ארנב']

// עמוד ההרשמה, שלב 2 - /register/details
// מקבל משלב 1 את שם המשתמש והסיסמה (location.state), משלים פרטים,
// שומר את המשתמש החדש בשרת ונכנס ליישום
export default function RegisterDetails({ onLogin }) {
  const navigate = useNavigate()
  const account = useLocation().state // { username, password } משלב 1
  const [details, setDetails] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    petName: '',
    petType: 'כלב',
  })
  const [avatar, setAvatar] = useState({ type: 'dog', bg: '#ffc65a' })
  const [error, setError] = useState('')

  // הגיעו לכאן בלי לעבור בשלב 1 - חוזרים להרשמה
  if (!account) return <Navigate to="/register" replace />

  function setField(field, value) {
    setDetails((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!details.name.trim()) {
      setError('יש למלא שם מלא')
      return
    }

    try {
      const newUser = await createUser({ ...account, ...details, avatar })
      onLogin(newUser)
      navigate(`/${newUser.username}`)
    } catch {
      setError('השמירה נכשלה, נסו שוב')
    }
  }

  return (
    <AuthLayout variant="register">
      <form className="auth-card" onSubmit={handleSubmit}>
        <span className="auth-badge">שלב 2 מתוך 2 • /register/details</span>
        <h1 className="auth-title">השלמת פרטים</h1>

        <AuthField label="שם מלא" value={details.name} onChange={(v) => setField('name', v)} />
        <AuthField
          label="אימייל"
          type="email"
          value={details.email}
          onChange={(v) => setField('email', v)}
        />
        <AuthField label="טלפון" type="tel" value={details.phone} onChange={(v) => setField('phone', v)} />
        <AuthField label="עיר" value={details.city} onChange={(v) => setField('city', v)} />

        <div className="auth-row">
          <AuthField
            label="שם חיית המחמד"
            value={details.petName}
            onChange={(v) => setField('petName', v)}
          />
          <label className="auth-label">
            סוג חיה
            <select
              className="auth-input"
              value={details.petType}
              onChange={(e) => setField('petType', e.target.value)}
            >
              {PET_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="auth-label">
          תמונת פרופיל
          <AvatarPicker value={avatar} onChange={setAvatar} />
        </div>

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" className="auth-btn">
          שמירה וכניסה ליישום
        </button>
      </form>
    </AuthLayout>
  )
}
