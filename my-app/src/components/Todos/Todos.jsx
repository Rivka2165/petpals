import { useEffect, useReducer, useState } from 'react'
import { todosReducer, initialState } from './todosReducer'
import { getTodos, createTodo, updateTodo, deleteTodo } from '../../api/todosApi'
import useSearch from '../../hooks/useSearch'
import AddTodo from './AddTodo'
import SearchBar from '../common/SearchBar'
import TodosStatusFilter from './TodosStatusFilter'
import TodosSort from './TodosSort'
import TodosList from './TodosList'
import '../../css/Todos.css'
import '../../css/TodosToolbar.css'

export default function Todos({ userId }) {
  const [state, dispatch] = useReducer(todosReducer, initialState)
  const [error, setError] = useState('')
  const { searchTerm, setSearchTerm, filters, setFilter, results } =
    useSearch(state.todos, ['id', 'title'])

  // טעינת המשימות מהשרת כשהעמוד נפתח
  useEffect(() => {
    getTodos(userId)
      .then((todos) => dispatch({ type: 'SET_TODOS', payload: todos }))
      .catch(() => setError('טעינת המשימות נכשלה'))
  }, [userId])

  // בכל פעולה: קודם השרת (todosApi), ורק אם הצליח - dispatch לרדיוסר

  async function handleAdd(title) {
    try {
      const newTodo = await createTodo({ userId, title, completed: false })
      dispatch({ type: 'ADD_TODO', payload: newTodo })
      setError('')
    } catch {
      setError('הוספת המשימה נכשלה')
    }
  }

  async function handleToggle(todo) {
    try {
      const updated = await updateTodo(todo.id, { completed: !todo.completed })
      dispatch({ type: 'UPDATE_TODO', payload: updated })
      setError('')
    } catch {
      setError('עדכון המשימה נכשל')
    }
  }

  async function handleEdit(id, title) {
    try {
      const updated = await updateTodo(id, { title })
      dispatch({ type: 'UPDATE_TODO', payload: updated })
      setError('')
    } catch {
      setError('עדכון המשימה נכשל')
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTodo(id)
      dispatch({ type: 'DELETE_TODO', payload: id })
      setError('')
    } catch {
      setError('מחיקת המשימה נכשלה')
    }
  }

  // מיון לא נוגע בשרת - רק ברדיוסר
  function handleSortChange(sortBy) {
    dispatch({ type: 'SET_SORT', payload: sortBy })
  }

  return (
    <section className="todos">
      <h1>המשימות שלי</h1>

      <AddTodo onAdd={handleAdd} />

      <div className="todos-toolbar">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="חיפוש לפי מספר, כותרת או מצב"
        />
        <TodosStatusFilter
          status={filters.completed ?? 'all'}
          onStatusChange={(value) => setFilter('completed', value)}
        />
        <TodosSort sortBy={state.sortBy} onSortChange={handleSortChange} />
      </div>

      {error && <p className="todos-error">{error}</p>}

      <TodosList
        todos={results}
        onToggle={handleToggle}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </section>
  )
}
