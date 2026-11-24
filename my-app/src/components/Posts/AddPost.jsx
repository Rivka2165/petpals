import { useState } from 'react'
import Modal from '../common/Modal'

// כפתור "+ פוסט חדש" שפותח חלון קופץ עם כותרת ותוכן
export default function AddPost({ onAdd }) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  function open() {
    setTitle('')
    setBody('')
    setIsOpen(true)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim() || !body.trim()) return

    onAdd({ title: title.trim(), body: body.trim() })
    setIsOpen(false)
  }

  return (
    <>
      <button type="button" className="posts-add-btn" onClick={open}>
        + פוסט חדש
      </button>

      {isOpen && (
        <Modal title="פוסט חדש" onClose={() => setIsOpen(false)}>
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
                פרסום
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
