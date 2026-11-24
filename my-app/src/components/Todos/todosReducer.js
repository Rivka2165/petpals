// הרדיוסר של המשימות - פונקציה טהורה:
// מקבל state + action ומחזיר state חדש. בלי fetch, בלי localStorage, בלי שינוי של המקור.

export const initialState = {
  todos: [],
  sortBy: 'id', // id | title | completed
}

// מיון רשימה לפי הקריטריון שנבחר. מחזיר מערך חדש (לא משנה את המקורי)
function sortTodos(todos, sortBy) {
  return [...todos].sort((a, b) => {
    if (sortBy === 'title') return a.title.localeCompare(b.title, 'he')
    if (sortBy === 'completed') return Number(a.completed) - Number(b.completed)
    return Number(a.id) - Number(b.id)
  })
}

export function todosReducer(state, action) {
  switch (action.type) {
    // טעינת כל המשימות של המשתמש (אחרי שהגיעו מהשרת)
    // payload: מערך משימות
    case 'SET_TODOS':
      return { ...state, todos: sortTodos(action.payload, state.sortBy) }

    // הוספת משימה (אחרי שהשרת יצר אותה ונתן לה id)
    // payload: המשימה החדשה
    case 'ADD_TODO':
      return { ...state, todos: sortTodos([...state.todos, action.payload], state.sortBy) }

    // עדכון משימה - גם שינוי כותרת וגם סימון בוצע / לא בוצע
    // payload: המשימה המעודכנת כפי שחזרה מהשרת
    case 'UPDATE_TODO': {
      const updated = state.todos.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      )
      return { ...state, todos: sortTodos(updated, state.sortBy) }
    }

    // מחיקת משימה
    // payload: ה-id של המשימה
    case 'DELETE_TODO':
      return { ...state, todos: state.todos.filter((todo) => todo.id !== action.payload) }

    // שינוי סוג המיון
    // payload: 'id' | 'title' | 'completed'
    case 'SET_SORT':
      return { ...state, sortBy: action.payload, todos: sortTodos(state.todos, action.payload) }

    default:
      return state
  }
}
