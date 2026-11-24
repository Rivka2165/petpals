// אייקון של חיית מחמד (חתול / כלב / ארנב) בעיגול צבעוני, כמו בהדמיה
// type - 'cat' | 'dog' | 'rabbit',  size - גודל בפיקסלים,  bg - צבע העיגול
export default function PetIcon({ type, size = 48, bg = '#ffffff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true">
      <circle cx="50" cy="50" r="50" fill={bg} />
      {type === 'cat' && <Cat />}
      {type === 'dog' && <Dog />}
      {type === 'rabbit' && <Rabbit />}
    </svg>
  )
}

const DARK = '#2a2342'

function Cat() {
  return (
    <>
      <polygon points="25,42 28,14 47,31" fill="#e8892f" />
      <polygon points="75,42 72,14 53,31" fill="#e8892f" />
      <circle cx="50" cy="55" r="26" fill="#f4a24c" />
      <circle cx="41" cy="51" r="3.5" fill={DARK} />
      <circle cx="59" cy="51" r="3.5" fill={DARK} />
      <path d="M44 61 Q50 66 56 61" stroke={DARK} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <line x1="16" y1="58" x2="32" y2="58" stroke={DARK} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="68" y1="58" x2="84" y2="58" stroke={DARK} strokeWidth="2.5" strokeLinecap="round" />
    </>
  )
}

function Dog() {
  return (
    <>
      <ellipse cx="27" cy="50" rx="9" ry="18" fill="#8b5a33" />
      <ellipse cx="73" cy="50" rx="9" ry="18" fill="#8b5a33" />
      <circle cx="50" cy="52" r="24" fill="#e0b585" />
      <ellipse cx="50" cy="63" rx="12" ry="9" fill="#f6e6cf" />
      <circle cx="42" cy="47" r="3.5" fill={DARK} />
      <circle cx="58" cy="47" r="3.5" fill={DARK} />
      <ellipse cx="50" cy="58" rx="4.5" ry="3.5" fill={DARK} />
    </>
  )
}

function Rabbit() {
  return (
    <>
      <ellipse cx="40" cy="27" rx="7" ry="18" fill="#f1ebe3" />
      <ellipse cx="60" cy="27" rx="7" ry="18" fill="#f1ebe3" />
      <ellipse cx="40" cy="28" rx="3.5" ry="13" fill="#f6a5b8" />
      <ellipse cx="60" cy="28" rx="3.5" ry="13" fill="#f6a5b8" />
      <circle cx="50" cy="60" r="21" fill="#f1ebe3" />
      <circle cx="42" cy="57" r="3" fill={DARK} />
      <circle cx="58" cy="57" r="3" fill={DARK} />
      <ellipse cx="50" cy="65" rx="3" ry="2.2" fill="#f39bb0" />
    </>
  )
}
