import '../../css/TodosToolbar.css'

// סינון המשימות לפי מצב - שולח ל-hook של החיפוש
export default function TodosStatusFilter({ status, onStatusChange }) {
  return (
    <select
      className="todos-select"
      value={status}
      onChange={(e) => onStatusChange(e.target.value)}
    >
      <option value="all">מצב: הכל</option>
      <option value="true">בוצע</option>
      <option value="false">לא בוצע</option>
    </select>
  )
}
