import { useState } from 'react'

const STORAGE_KEY = 'currentUser'

// קריאת המשתמש מה-localStorage (אם אין / המידע פגום - אין משתמש מחובר)
function readStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY))
  } catch {
    return null
  }
}

// המשתמש המחובר לכל האפליקציה.
// נשמר ב-localStorage - ולכן נשאר מחובר גם אחרי ריענון של הדף.
export default function useCurrentUser() {
  const [user, setUser] = useState(readStoredUser)

  // כניסה: שומרים את המשתמש בלי הסיסמה
  function login(userFromServer) {
    const safeUser = { ...userFromServer }
    delete safeUser.password
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser))
    setUser(safeUser)
  }

  // יציאה: מוחקים מה-localStorage
  function logout() {
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }

  return { user, login, logout }
}
