import Avatar from '../common/Avatar'
import EditComment from './EditComment'
import DeleteComment from './DeleteComment'

// תגובה בודדת: תמונת הפרופיל של הכותב + הבועה עם התגובה.
// עריכה ומחיקה - רק לתגובה של המשתמש הפעיל
export default function CommentItem({ comment, isMine, onEdit, onDelete }) {
  return (
    <li className="comment-item">
      <Avatar avatar={comment.avatar} size={44} />

      <div className="comment-bubble">
        <div className="comment-author">
          {comment.name}
          {isMine && ' (אני)'}
        </div>
        <p className="comment-body">{comment.body}</p>

        {isMine && (
          <div className="comment-actions">
            <EditComment comment={comment} onEdit={onEdit} />
            <span aria-hidden="true">·</span>
            <DeleteComment id={comment.id} onDelete={onDelete} />
          </div>
        )}
      </div>
    </li>
  )
}
