import { useState } from 'react'

// שדה כתיבת תגובה חדשה + כפתור שליחה
export default function AddComment({ onAdd }) {
  const [body, setBody] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!body.trim()) return

    onAdd(body.trim())
    setBody('')
  }

  return (
    <form className="add-comment" onSubmit={handleSubmit}>
      <input
        type="text"
        className="add-comment-input"
        placeholder="כתיבת תגובה..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button type="submit" className="add-comment-btn">
        שליחה
      </button>
    </form>
  )
}
