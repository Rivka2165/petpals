// קליינט של טבלת התמונות - מעביר בקשות לקליינט הכללי
import { get, post, patch, remove } from './client'

// "דף" אחד של תמונות מאלבום: עד limit תמונות שה-id שלהן גדול מ-afterId.
// ככה "טעינת עוד" ממשיכה בדיוק מהתמונה האחרונה שנטענה,
// גם אם בינתיים נוספו או נמחקו תמונות.
export function getPhotos(albumId, afterId, limit) {
  return get(`photos?albumId=${albumId}&id_gte=${afterId + 1}&_sort=id&_limit=${limit}`)
}

export function createPhoto(newPhoto) {
  return post('photos', newPhoto)
}

export function updatePhoto(id, changes) {
  return patch(`photos/${id}`, changes)
}

export function deletePhoto(id) {
  return remove(`photos/${id}`)
}
