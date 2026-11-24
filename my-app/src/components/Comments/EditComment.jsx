import { useState } from 'react'
import Modal from '../common/Modal'

// עדכון תוכן של תגובה - קישור "עריכה" שפותח חלון קופץ
export default function EditComment({ comment, onEdit }) {
  const [isOpen, setIsOpen] = useState(false)
  const [body, setBody] = useState(comment.body)

  function open() {
    setBody(comment.body) // בכל פתיחה מתחילים מהתוכן הנוכחי
    setIsOpen(true)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!body.trim()) return

    onEdit(comment.id, body.trim())
    setIsOpen(false)
  }

  return (
    <>
      <button type="button" className="comment-link" onClick={open}>
        עריכה
      </button>

      {isOpen && (
        <Modal title="עריכת תגובה" onClose={() => setIsOpen(false)}>
          <form onSubmit={handleSubmit}>
            <label className="modal-label">
              תוכן
              <textarea
                className="modal-input"
                rows={3}
                value={body}
                onChange={(e) => setBody(e.target.value)}
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
