// מחיקת משימה
export default function DeleteTodo({ id, onDelete }) {
  return (
    <button type="button" className="btn-outline" onClick={() => onDelete(id)}>
      מחיקה
    </button>
  )
}
