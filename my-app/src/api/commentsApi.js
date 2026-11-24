// קליינט של טבלת התגובות - מעביר בקשות לקליינט הכללי
import { get, post, patch, remove } from './client'

// כל התגובות של פוסט מסוים
export function getComments(postId) {
  return get(`comments?postId=${postId}`)
}

export function createComment(comment) {
  return post('comments', comment)
}

export function updateComment(id, changes) {
  return patch(`comments/${id}`, changes)
}

export function deleteComment(id) {
  return remove(`comments/${id}`)
}
