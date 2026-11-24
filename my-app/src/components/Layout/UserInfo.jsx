import Modal from '../common/Modal'
import '../../css/UserInfo.css'

// חלון "הפרטים שלי" - מציג את הפרטים של המשתמש הנוכחי (בלי הסיסמה), כמו בהדמיה
export default function UserInfo({ user, onClose }) {
  const details = [
    { label: 'שם מלא', value: user.name },
    { label: 'שם משתמש', value: user.username },
    { label: 'אימייל', value: user.email },
    { label: 'טלפון', value: user.phone },
    { label: 'עיר', value: user.city },
    { label: 'חיית מחמד', value: [user.petName, user.petType].filter(Boolean).join(', ') },
  ]

  return (
    <Modal title="הפרטים שלי" onClose={onClose}>
      <ul className="info-list">
        {details.map((item) => (
          <li key={item.label} className="info-row">
            <span className="info-label">{item.label}</span>
            <span className="info-value">{item.value || '-'}</span>
          </li>
        ))}
      </ul>

      <div className="modal-buttons">
        <button type="button" className="modal-btn-primary" onClick={onClose}>
          סגירה
        </button>
      </div>
    </Modal>
  )
}
