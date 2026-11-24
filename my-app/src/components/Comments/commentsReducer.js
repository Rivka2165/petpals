// הרדיוסר של התגובות - פונקציה טהורה:
// מקבל state + action ומחזיר state חדש. בלי fetch, בלי localStorage, בלי שינוי של המקור.

export const initialState = {
  comments: [],
  isLoaded: false, // האם כבר הבאנו את התגובות מהשרת (כדי לא להביא שוב בכל פתיחה)
}

export function commentsReducer(state, action) {
  switch (action.type) {
    // טעינת התגובות של הפוסט (אחרי שהגיעו מהשרת)
    // payload: מערך תגובות
    case 'SET_COMMENTS':
      return { ...state, comments: action.payload, isLoaded: true }

    // הוספת תגובה בסוף הרשימה (אחרי שהשרת יצר אותה ונתן לה id)
    // payload: התגובה החדשה
    case 'ADD_COMMENT':
      return { ...state, comments: [...state.comments, action.payload] }

    // עדכון תוכן של תגובה
    // payload: התגובה המעודכנת כפי שחזרה מהשרת
    case 'UPDATE_COMMENT':
      return {
        ...state,
        comments: state.comments.map((c) => (c.id === action.payload.id ? action.payload : c)),
      }

    // מחיקת תגובה
    // payload: ה-id של התגובה
    case 'DELETE_COMMENT':
      return { ...state, comments: state.comments.filter((c) => c.id !== action.payload) }

    default:
      return state
  }
}
