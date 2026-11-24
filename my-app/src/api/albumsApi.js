// קליינט של טבלת האלבומים - מעביר בקשות לקליינט הכללי
import { get, post, remove } from './client'

// האלבומים של משתמש מסוים (אלבומים פרטיים - רק של המשתמש הפעיל)
export function getAlbums(userId) {
  return get(`albums?userId=${userId}`)
}

export function createAlbum(newAlbum) {
  return post('albums', newAlbum)
}

// השרת (json-server) מוחק יחד עם האלבום גם את כל התמונות שלו
export function deleteAlbum(id) {
  return remove(`albums/${id}`)
}
