// שורה אחת ברשימת הפוסטים - לחיצה בוחרת את הפוסט
export default function PostListItem({ post, isSelected, onSelect }) {
  return (
    <li>
      <button
        type="button"
        className={isSelected ? 'post-list-item selected' : 'post-list-item'}
        onClick={() => onSelect(post.id)}
      >
        <span className="post-list-id">{post.id}</span>
        <span className="post-list-title">{post.title}</span>
      </button>
    </li>
  )
}
