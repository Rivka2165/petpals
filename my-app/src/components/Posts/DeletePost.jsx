// מחיקת פוסט
export default function DeletePost({ id, onDelete }) {
  return (
    <button type="button" className="post-btn-outline" onClick={() => onDelete(id)}>
      מחיקה
    </button>
  )
}
