import { useState } from 'react'
import Modal from '../common/Modal'

// כפתור "+ אלבום חדש" שפותח חלון קופץ עם שם האלבום
export default function AddAlbum({ onAdd }) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')

  function open() {
    setTitle('')
    setIsOpen(true)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return

    onAdd(title.trim())
    setIsOpen(false)
  }

  return (
    <>
      <button type="button" className="albums-add-btn" onClick={open}>
        + אלבום חדש
      </button>

      {isOpen && (
        <Modal title="אלבום חדש" onClose={() => setIsOpen(false)}>
          <form onSubmit={handleSubmit}>
            <label className="modal-label">
              שם האלבום
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
                יצירה
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
