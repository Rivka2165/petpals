import CommentItem from './CommentItem'

// רשימת התגובות של הפוסט
export default function CommentsList({ comments, currentUserId, onEdit, onDelete }) {
  if (comments.length === 0) {
    return <p className="comments-empty">עדיין אין תגובות</p>
  }

  return (
    <ul className="comments-list">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          isMine={comment.userId === currentUserId}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
