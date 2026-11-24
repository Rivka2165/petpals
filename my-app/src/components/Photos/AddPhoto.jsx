import { useState } from 'react'
import Modal from '../common/Modal'

// כפתור "+ תמונה" שפותח חלון קופץ עם כותרת וקישור לתמונה
export default function AddPhoto({ onAdd }) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  function open() {
    setTitle('')
    setUrl('')
    setIsOpen(true)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim() || !url.trim()) return

    onAdd({ title: title.trim(), url: url.trim() })
    setIsOpen(false)
  }

  return (
    <>
      <button type="button" className="photos-add-btn" onClick={open}>
        + תמונה
      </button>

      {isOpen && (
        <Modal title="הוספת תמונה" onClose={() => setIsOpen(false)}>
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

            <label className="modal-label">
              קישור לתמונה
              <input
                type="url"
                className="modal-input"
                placeholder="https://"
                dir="ltr"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </label>

            <div className="modal-buttons">
              <button type="submit" className="modal-btn-primary">
                הוספה
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
