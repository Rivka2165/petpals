// קליינט של טבלת הפוסטים - מעביר בקשות לקליינט הכללי
import { get, post, patch, remove } from './client'

// הפוסטים של משתמש מסוים
export function getPosts(userId) {
  return get(`posts?userId=${userId}`)
}

// כל הפוסטים של כל המשתמשים
export function getAllPosts() {
  return get('posts')
}

export function createPost(newPost) {
  return post('posts', newPost)
}

export function updatePost(id, changes) {
  return patch(`posts/${id}`, changes)
}

export function deletePost(id) {
  return remove(`posts/${id}`)
}
