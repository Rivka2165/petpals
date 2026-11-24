import TodoItem from './TodoItem'
import '../../css/TodosList.css'

// הצגת רשימת המשימות (אחרי חיפוש, סינון ומיון)
export default function TodosList({ todos, onToggle, onEdit, onDelete }) {
  if (todos.length === 0) {
    return <p className="todos-empty">לא נמצאו משימות</p>
  }

  return (
    <ul className="todos-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
