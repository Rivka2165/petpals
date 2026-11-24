import '../../css/SearchBar.css'

// שדה חיפוש כללי - משמש במשימות, פוסטים, אלבומים ותגובות
export default function SearchBar({ searchTerm, onSearchChange, placeholder = 'חיפוש...' }) {
  return (
    <input
      type="search"
      className="search-bar"
      placeholder={placeholder}
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  )
}
