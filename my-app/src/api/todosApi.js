// קליינט של טבלת המשימות - מעביר בקשות לקליינט הכללי
import { get, post, patch, remove } from './client'

export function getTodos(userId) {
  return get(`todos?userId=${userId}`)
}

export function createTodo(todo) {
  return post('todos', todo)
}

export function updateTodo(id, changes) {
  return patch(`todos/${id}`, changes)
}

export function deleteTodo(id) {
  return remove(`todos/${id}`)
}
