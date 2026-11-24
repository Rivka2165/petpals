import '../../css/Modal.css'

// חלון קופץ כללי - משמש לעריכת משימה, פוסט חדש, אלבום חדש והוספת תמונה
export default function Modal({ title, onClose, children }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* לחיצה בתוך החלון לא סוגרת אותו */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">{title}</h2>
        {children}
      </div>
    </div>
  )
}
