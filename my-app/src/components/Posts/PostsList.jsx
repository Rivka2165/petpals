import PostListItem from './PostListItem'

// רשימת הפוסטים במצב סקירה (אחרי חיפוש) - רק מספר וכותרת
export default function PostsList({ posts, selectedId, onSelect }) {
  if (posts.length === 0) {
    return <p className="posts-list-empty">לא נמצאו פוסטים</p>
  }

  return (
    <ul className="posts-list">
      {posts.map((post) => (
        <PostListItem
          key={post.id}
          post={post}
          isSelected={post.id === selectedId}
          onSelect={onSelect}
        />
      ))}
    </ul>
  )
}
