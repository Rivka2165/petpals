// מחיקת אלבום - יחד עם כל התמונות שבו, לכן מבקשים אישור קודם
export default function DeleteAlbum({ id, onDelete }) {
  function handleClick() {
    if (window.confirm('למחוק את האלבום וכל התמונות שבו?')) {
      onDelete(id)
    }
  }

  return (
    <button type="button" className="albums-btn-outline" onClick={handleClick}>
      מחיקת אלבום
    </button>
  )
}
