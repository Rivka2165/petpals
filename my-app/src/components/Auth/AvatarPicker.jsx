import PetIcon from '../common/PetIcon'
import '../../css/AvatarPicker.css'

// כל החיות שיש באתר, וכמה רקעים לכל אחת
const PET_TYPES = ['cat', 'dog', 'rabbit']
const BACKGROUNDS = ['#ffc65a', '#a3e4dc', '#ffb7a3', '#d9ccf5']

// בחירת תמונת פרופיל: value = { type, bg }, onChange מקבל את הבחירה החדשה
export default function AvatarPicker({ value, onChange }) {
  return (
    <div className="avatar-picker">
      {PET_TYPES.map((type) =>
        BACKGROUNDS.map((bg) => {
          const isSelected = value.type === type && value.bg === bg
          return (
            <button
              key={type + bg}
              type="button"
              className={isSelected ? 'avatar-option selected' : 'avatar-option'}
              onClick={() => onChange({ type, bg })}
              aria-pressed={isSelected}
            >
              <PetIcon type={type} size={52} bg={bg} />
            </button>
          )
        })
      )}
    </div>
  )
}
