import '../../css/TodosToolbar.css'

// מיון המשימות - שולח לרדיוסר
export default function TodosSort({ sortBy, onSortChange }) {
  return (
    <select
      className="todos-select"
      value={sortBy}
      onChange={(e) => onSortChange(e.target.value)}
    >
      <option value="id">מיון לפי מספר</option>
      <option value="title">מיון לפי כותרת</option>
      <option value="completed">מיון לפי מצב</option>
      
    </select>
  )
}
