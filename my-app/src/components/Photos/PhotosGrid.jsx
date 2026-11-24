import PhotoCard from './PhotoCard'

// רשת התמונות של האלבום
export default function PhotosGrid({ photos, onEdit, onDelete }) {
  return (
    <ul className="photos-grid">
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  )
}
