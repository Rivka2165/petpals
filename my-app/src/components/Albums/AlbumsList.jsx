import AlbumListItem from './AlbumListItem'

// רשימת האלבומים (אחרי חיפוש) - מספר וכותרת
export default function AlbumsList({ albums, selectedId, onSelect }) {
  if (albums.length === 0) {
    return <p className="albums-list-empty">לא נמצאו אלבומים</p>
  }

  return (
    <ul className="albums-list">
      {albums.map((album) => (
        <AlbumListItem
          key={album.id}
          album={album}
          isSelected={album.id === selectedId}
          onSelect={onSelect}
        />
      ))}
    </ul>
  )
}
