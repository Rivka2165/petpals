// שורה אחת ברשימת האלבומים - לחיצה בוחרת את האלבום
export default function AlbumListItem({ album, isSelected, onSelect }) {
  return (
    <li>
      <button
        type="button"
        className={isSelected ? 'album-list-item selected' : 'album-list-item'}
        onClick={() => onSelect(album.id)}
      >
        <span className="album-list-id">{album.id}</span>
        <span className="album-list-title">{album.title}</span>
      </button>
    </li>
  )
}
