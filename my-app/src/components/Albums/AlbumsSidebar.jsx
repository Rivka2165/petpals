import useSearch from '../../hooks/useSearch'
import SearchBar from '../common/SearchBar'
import AddAlbum from './AddAlbum'
import AlbumsList from './AlbumsList'
import '../../css/AlbumsSidebar.css'

// הצד של הרשימה: חיפוש + אלבום חדש + רשימת האלבומים
// החיפוש נמצא כאן כי גם שורת החיפוש וגם הרשימה צריכות אותו
export default function AlbumsSidebar({ albums, selectedId, onSelect, onAdd }) {
  const { searchTerm, setSearchTerm, results } = useSearch(albums, ['id', 'title'])

  return (
    <aside className="albums-sidebar">
      <span className="albums-private-badge">פרטי</span>
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="חיפוש לפי מספר או כותרת"
      />
      <AddAlbum onAdd={onAdd} />
      <AlbumsList albums={results} selectedId={selectedId} onSelect={onSelect} />
    </aside>
  )
}
