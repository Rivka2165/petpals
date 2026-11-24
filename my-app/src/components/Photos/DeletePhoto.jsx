// מחיקת תמונה
export default function DeletePhoto({ id, onDelete }) {
  return (
    <button type="button" className="photos-btn-outline" onClick={() => onDelete(id)}>
      מחיקה
    </button>
  )
}
