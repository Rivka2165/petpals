import EditPhoto from './EditPhoto'
import DeletePhoto from './DeletePhoto'

// כרטיס של תמונה אחת: התמונה, הכותרת, ועריכה / מחיקה
export default function PhotoCard({ photo, onEdit, onDelete }) {
  return (
    <li className="photo-card">
      <img
        className="photo-card-img"
        src={photo.thumbnailUrl || photo.url}
        alt={photo.title}
        loading="lazy"
      />
      <p className="photo-card-title">{photo.title}</p>
      <div className="photo-card-actions">
        <EditPhoto photo={photo} onEdit={onEdit} />
        <DeletePhoto id={photo.id} onDelete={onDelete} />
      </div>
    </li>
  )
}
