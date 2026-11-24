import PetIcon from './PetIcon'

// ברירת מחדל - למשתמשים / תגובות ישנים שאין להם תמונת פרופיל
const DEFAULT_AVATAR = { type: 'cat', bg: '#ffc65a' }

// תמונת הפרופיל של משתמש: avatar = { type: 'cat'|'dog'|'rabbit', bg: צבע הרקע }
export default function Avatar({ avatar, size = 48 }) {
  const { type, bg } = avatar ?? DEFAULT_AVATAR
  return <PetIcon type={type} size={size} bg={bg} />
}
