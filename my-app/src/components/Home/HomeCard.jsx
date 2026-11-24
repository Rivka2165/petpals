import { Link } from 'react-router-dom'
import PetIcon from '../common/PetIcon'

// כרטיס בעמוד הבית: אייקון, כותרת, טקסט וכפתור "כניסה"
export default function HomeCard({ icon, iconBg, title, text, to }) {
  return (
    <div className="home-card">
      <PetIcon type={icon} size={82} bg={iconBg} />
      <h2 className="home-card-title">{title}</h2>
      <p className="home-card-text">{text}</p>
      <Link to={to} className="home-card-btn">
        כניסה
      </Link>
    </div>
  )
}
