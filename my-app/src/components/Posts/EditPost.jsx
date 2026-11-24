import { useState } from 'react'
import Modal from '../common/Modal'

// עדכון כותרת ותוכן של פוסט - כפתור "עריכה" שפותח חלון קופץ
export default function EditPost({ post, onEdit }) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState(post.title)
  const [body, setBody] = useState(post.body)

  function open() {
    // בכל פתיחה מתחילים מהערכים הנוכחיים
    setTitle(post.title)
    setBody(post.body)
    setIsOpen(true)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim() || !body.trim()) return

    onEdit(post.id, { title: title.trim(), body: body.trim() })
    setIsOpen(false)
  }

  return (
    <>
      <button type="button" className="post-btn-outline" onClick={open}>
        עריכה
      </button>

      {isOpen && (
        <Modal title="עריכת פוסט" onClose={() => setIsOpen(false)}>
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
              תוכן
              <textarea
                className="modal-input"
                rows={5}
                value={body}
                onChange={(e) => setBody(e.target.value)}
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
