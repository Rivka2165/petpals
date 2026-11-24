// הרדיוסר של האלבומים - פונקציה טהורה:
// מקבל state + action ומחזיר state חדש. בלי fetch, בלי localStorage, בלי שינוי של המקור.
// האלבום שנבחר לא נשמר כאן - הוא בכתובת (URL), למשל /Bret/albums/2/photos

export const initialState = {
  albums: [],
}

// הרשימה תמיד ממוינת לפי מספר. מחזיר מערך חדש (לא משנה את המקורי)
function sortAlbums(albums) {
  return [...albums].sort((a, b) => Number(a.id) - Number(b.id))
}

export function albumsReducer(state, action) {
  switch (action.type) {
    // טעינת רשימת האלבומים (אחרי שהגיעו מהשרת)
    // payload: מערך אלבומים
    case 'SET_ALBUMS':
      return { ...state, albums: sortAlbums(action.payload) }

    // הוספת אלבום (אחרי שהשרת יצר אותו ונתן לו id)
    // payload: האלבום החדש
    case 'ADD_ALBUM':
      return { ...state, albums: sortAlbums([...state.albums, action.payload]) }

    // מחיקת אלבום
    // payload: ה-id של האלבום
    case 'DELETE_ALBUM':
      return { ...state, albums: state.albums.filter((a) => a.id !== action.payload) }

    default:
      return state
  }
}
