import { useState } from 'react'

// חיפוש כללי: מתאים למשימות, פוסטים, אלבומים ותגובות
// items        - הרשימה לחיפוש
// searchFields - השדות שבהם מחפשים, למשל ['id', 'title'] או ['id', 'body']
export default function useSearch(items, searchFields) {
  const [searchTerm, setSearchTerm] = useState('')
  // סינונים לפי שדה מסוים, למשל { completed: 'true' }. הערך 'all' = בלי סינון
  const [filters, setFilters] = useState({})

  function setFilter(field, value) {
    setFilters((prev) => ({ ...prev, [field]: value }))
  }

  const term = searchTerm.trim().toLowerCase()

  const results = items.filter((item) => {
    // 1. סינונים
    for (const [field, value] of Object.entries(filters)) {
      if (value !== 'all' && String(item[field]) !== value) return false
    }

    // 2. חיפוש טקסט
    if (!term) return true
    return searchFields.some((field) => {
      const fieldValue = String(item[field] ?? '').toLowerCase()
      // מספר מזהה - התאמה מדויקת (כדי ש-1 לא ימצא גם את 10, 11, 12)
      return field === 'id' ? fieldValue === term : fieldValue.includes(term)
    })
  })

  return { searchTerm, setSearchTerm, filters, setFilter, results }
}
