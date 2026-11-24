import EditPost from './EditPost'
import DeletePost from './DeletePost'
import '../../css/PostView.css'

// הצגת פוסט בודד (זה שנבחר). עריכה ומחיקה - רק לפוסט של המשתמש הפעיל
export default function PostView({ post, isMine, onEdit, onDelete }) {
  return (
    <article className="post-view">
      <div className="post-view-header">
        <h2 className="post-view-title">{post.title}</h2>

        {isMine && (
          <div className="post-view-actions">
            <EditPost post={post} onEdit={onEdit} />
            <DeletePost id={post.id} onDelete={onDelete} />
          </div>
        )}
      </div>

      <p className="post-view-body">{post.body}</p>
    </article>
  )
}
