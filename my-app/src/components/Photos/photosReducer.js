// הרדיוסר של התמונות - פונקציה טהורה:
// מקבל state + action ומחזיר state חדש. בלי fetch, בלי localStorage, בלי שינוי של המקור.

export const initialState = {
  photos: [],
  lastLoadedId: 0, // ה-id של התמונה האחרונה שהגיעה מהשרת - ממנה ממשיכים ב"טעינת עוד"
  hasMore: true, // האם יש עוד תמונות בשרת שעוד לא נטענו
  isLoaded: false, // האם הדף הראשון כבר הגיע (כדי לא להציג "אין תמונות" לפני הטעינה)
}

// התמונות תמיד ממוינות לפי מספר. מחזיר מערך חדש (לא משנה את המקורי)
function sortPhotos(photos) {
  return [...photos].sort((a, b) => Number(a.id) - Number(b.id))
}

export function photosReducer(state, action) {
  switch (action.type) {
    // הוספת "דף" של תמונות שהגיע מהשרת (בפתיחה ובכל "טעינת עוד")
    // payload: { photos: מערך תמונות, hasMore: האם יש עוד }
    case 'ADD_PAGE': {
      const { photos, hasMore } = action.payload
      // תמונה שהמשתמש הוסיף בעצמו כבר נמצאת ברשימה - לא מוסיפים אותה פעמיים
      const newPhotos = photos.filter((p) => !state.photos.some((old) => old.id === p.id))
      return {
        ...state,
        photos: sortPhotos([...state.photos, ...newPhotos]),
        lastLoadedId: photos.length > 0 ? photos[photos.length - 1].id : state.lastLoadedId,
        hasMore,
        isLoaded: true,
      }
    }

    // הוספת תמונה (אחרי שהשרת יצר אותה ונתן לה id)
    // payload: התמונה החדשה
    case 'ADD_PHOTO':
      return { ...state, photos: sortPhotos([...state.photos, action.payload]) }

    // עדכון תמונה (כותרת / קישור)
    // payload: התמונה המעודכנת כפי שחזרה מהשרת
    case 'UPDATE_PHOTO':
      return {
        ...state,
        photos: state.photos.map((p) => (p.id === action.payload.id ? action.payload : p)),
      }

    // מחיקת תמונה
    // payload: ה-id של התמונה
    case 'DELETE_PHOTO':
      return { ...state, photos: state.photos.filter((p) => p.id !== action.payload) }

    default:
      return state
  }
}
