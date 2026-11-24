import PetIcon from '../common/PetIcon'
import '../../css/Auth.css'

// המסגרת של עמודי הכניסה וההרשמה, כמו בהדמיה:
// מימין - פאנל צבעוני עם כותרת, ומשמאל - הכרטיס עם הטופס (children)
// variant: 'login' (כתום) | 'register' (סגול-טורקיז)
export default function AuthLayout({ variant, children }) {
  const isLogin = variant === 'login'

  return (
    <div className="auth-page">
      <aside className={`auth-panel ${isLogin ? 'auth-panel-login' : 'auth-panel-register'}`}>
        <div className="auth-panel-content">
          <div className="auth-icons">
            <PetIcon type="cat" size={72} />
            <PetIcon type="dog" size={72} />
            <PetIcon type="rabbit" size={72} />
          </div>

          {isLogin ? (
            <>
              <h2 className="auth-panel-title">
                הקהילה של
                <br />
                חיות המחמד
              </h2>
              <p className="auth-panel-text">
                משתפים פוסטים, שומרים אלבומים פרטיים ומנהלים משימות לכלב, לחתול ולארנב.
              </p>
              <BigCat />
            </>
          ) : (
            <>
              <h2 className="auth-panel-title">
                מצטרפים
                <br />
                למשפחת PetPals
              </h2>
              <p className="auth-panel-text">כמה פרטים קטנים, ואפשר להתחיל לשתף.</p>
            </>
          )}
        </div>
      </aside>

      <main className="auth-main">{children}</main>
    </div>
  )
}

// החתול הגדול בתחתית הפאנל של עמוד הכניסה
function BigCat() {
  return (
    <div className="auth-art" aria-hidden="true">
      <svg viewBox="0 0 500 260" preserveAspectRatio="xMidYMax meet">
        <polygon points="160,95 168,10 240,70" fill="#e8892f" />
        <polygon points="340,95 332,10 260,70" fill="#e8892f" />
        <circle cx="250" cy="165" r="108" fill="#f4a24c" />
        <circle cx="207" cy="130" r="11" fill="#2a2342" />
        <circle cx="293" cy="130" r="11" fill="#2a2342" />
        <path
          d="M228 172 Q250 188 272 172"
          stroke="#2a2342"
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
