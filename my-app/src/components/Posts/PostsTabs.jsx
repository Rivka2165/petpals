// מעבר בין "הפוסטים שלי" ל"כל הפוסטים"
export default function PostsTabs({ view, onViewChange }) {
  return (
    <div className="posts-tabs">
      <button
        type="button"
        className={view === 'mine' ? 'posts-tab active' : 'posts-tab'}
        onClick={() => onViewChange('mine')}
      >
        הפוסטים שלי
      </button>
      <button
        type="button"
        className={view === 'all' ? 'posts-tab active' : 'posts-tab'}
        onClick={() => onViewChange('all')}
      >
        כל הפוסטים
      </button>
    </div>
  )
}
