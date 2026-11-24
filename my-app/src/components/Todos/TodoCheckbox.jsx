// סימון / ביטול סימון של משימה
export default function TodoCheckbox({ todo, onToggle }) {
  return (
    <input
      type="checkbox"
      className="todo-checkbox"
      checked={todo.completed}
      onChange={() => onToggle(todo)}
    />
  )
}
