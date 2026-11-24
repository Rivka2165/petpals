// הרדיוסר של הפוסטים - פונקציה טהורה:
// מקבל state + action ומחזיר state חדש. בלי fetch, בלי localStorage, בלי שינוי של המקור.
// הפוסט שנבחר ו"שלי / כולם" לא נשמרים כאן - הם בכתובת (URL), למשל /Bret/posts/4?view=all

export const initialState = {
  posts: [],
}

// הרשימה תמיד ממוינת לפי מספר. מחזיר מערך חדש (לא משנה את המקורי)
function sortPosts(posts) {
  return [...posts].sort((a, b) => Number(a.id) - Number(b.id))
}

export function postsReducer(state, action) {
  switch (action.type) {
    // טעינת רשימת הפוסטים (אחרי שהגיעו מהשרת)
    // payload: מערך פוסטים
    case 'SET_POSTS':
      return { ...state, posts: sortPosts(action.payload) }

    // הוספת פוסט (אחרי שהשרת יצר אותו ונתן לו id)
    // payload: הפוסט החדש
    case 'ADD_POST':
      return { ...state, posts: sortPosts([...state.posts, action.payload]) }

    // עדכון פוסט (כותרת / תוכן)
    // payload: הפוסט המעודכן כפי שחזר מהשרת
    case 'UPDATE_POST':
      return {
        ...state,
        posts: state.posts.map((p) => (p.id === action.payload.id ? action.payload : p)),
      }

    // מחיקת פוסט
    // payload: ה-id של הפוסט
    case 'DELETE_POST':
      return { ...state, posts: state.posts.filter((p) => p.id !== action.payload) }

    default:
      return state
  }
}
