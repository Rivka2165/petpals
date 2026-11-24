import { useState } from 'react'
import Modal from '../common/Modal'

// עדכון כותרת וקישור של תמונה - כפתור "עריכה" שפותח חלון קופץ
export default function EditPhoto({ photo, onEdit }) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState(photo.title)
  const [url, setUrl] = useState(photo.url)

  function open() {
    // בכל פתיחה מתחילים מהערכים הנוכחיים
    setTitle(photo.title)
    setUrl(photo.url)
    setIsOpen(true)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim() || !url.trim()) return

    onEdit(photo.id, { title: title.trim(), url: url.trim() })
    setIsOpen(false)
  }

  return (
    <>
      <button type="button" className="photos-btn-outline" onClick={open}>
        עריכה
      </button>

      {isOpen && (
        <Modal title="עריכת תמונה" onClose={() => setIsOpen(false)}>
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
                dir="ltr"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
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
