// קליינט של טבלת המשתמשים - מעביר בקשות לקליינט הכללי
import { get, post } from './client'

// מחזיר מערך: ריק אם אין משתמש כזה, או מערך עם משתמש אחד
export function getUserByUsername(username) {
  return get(`users?username=${encodeURIComponent(username)}`)
}

export function createUser(user) {
  return post('users', user)
}
