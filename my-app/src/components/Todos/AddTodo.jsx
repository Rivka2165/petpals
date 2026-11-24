import { useState } from 'react'
import '../../css/AddTodo.css'

export default function AddTodo({ onAdd }) {
  const [title, setTitle] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return

    onAdd(title.trim())
    setTitle('')
  }

  return (
    <form className="add-todo" onSubmit={handleSubmit}>
      <input
        type="text"
        className="add-todo-input"
        placeholder="הוספת משימה חדשה..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit" className="add-todo-btn">
        הוספה
      </button>
    </form>
  )
}
