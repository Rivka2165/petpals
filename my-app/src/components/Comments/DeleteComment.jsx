// מחיקת תגובה
export default function DeleteComment({ id, onDelete }) {
  return (
    <button type="button" className="comment-link" onClick={() => onDelete(id)}>
      מחיקה
    </button>
  )
}
