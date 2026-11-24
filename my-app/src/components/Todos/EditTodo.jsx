import { useState } from 'react'
import Modal from '../common/Modal'

// עדכון כותרת של משימה - כפתור "עריכה" שפותח חלון קופץ
export default function EditTodo({ todo, onEdit }) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState(todo.title)

  function open() {
    setTitle(todo.title) // בכל פתיחה מתחילים מהכותרת הנוכחית
    setIsOpen(true)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return

    onEdit(todo.id, title.trim())
    setIsOpen(false)
  }

  return (
    <>
      <button type="button" className="btn-outline" onClick={open}>
        עריכה
      </button>

      {isOpen && (
        <Modal title="עריכת משימה" onClose={() => setIsOpen(false)}>
          <form onSubmit={handleSubmit}>
            <label className="modal-label">
              כותרת
              <input
                type="text"
                className="modal-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
              />
            </label>

            <div className="modal-buttons">
              <button type="submit" className="modal-btn-primary">
                שמירה
              </button>
              <button
                type="button"
                className="modal-btn-outline"
                onClick={() => setIsOpen(false)}
              >
                ביטול
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  )
}
