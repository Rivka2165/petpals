import useSearch from '../../hooks/useSearch'
import SearchBar from '../common/SearchBar'
import PostsTabs from './PostsTabs'
import AddPost from './AddPost'
import PostsList from './PostsList'
import '../../css/PostsSidebar.css'

// הצד של הרשימה: חלוקה (שלי / כולם) + חיפוש + פוסט חדש + רשימת הפוסטים
// החיפוש נמצא כאן כי גם שורת החיפוש וגם הרשימה צריכות אותו
export default function PostsSidebar({ view, onViewChange, posts, selectedId, onSelect, onAdd }) {
  const { searchTerm, setSearchTerm, results } = useSearch(posts, ['id', 'title'])

  return (
    <aside className="posts-sidebar">
      <PostsTabs view={view} onViewChange={onViewChange} />
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="חיפוש לפי מספר או כותרת"
      />
      <AddPost onAdd={onAdd} />
      <PostsList posts={results} selectedId={selectedId} onSelect={onSelect} />
    </aside>
  )
}
