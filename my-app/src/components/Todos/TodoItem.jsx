import TodoCheckbox from './TodoCheckbox'
import EditTodo from './EditTodo'
import DeleteTodo from './DeleteTodo'
import '../../css/TodoItem.css'

// הצגת משימה בודדת: checkbox, המזהה הייחודי (id) מהשרת, כותרת, עריכה ומחיקה
export default function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  return (
    <li className="todo-item">
      <TodoCheckbox todo={todo} onToggle={onToggle} />
      <span className="todo-id">{todo.id}</span>
      <span className={todo.completed ? 'todo-title done' : 'todo-title'}>
        {todo.title}
      </span>

      <div className="todo-actions">
        <EditTodo todo={todo} onEdit={onEdit} />
        <DeleteTodo id={todo.id} onDelete={onDelete} />
      </div>
    </li>
  )
}
