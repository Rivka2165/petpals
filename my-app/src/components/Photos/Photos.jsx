import { useEffect, useReducer, useState } from 'react'
import { photosReducer, initialState } from './photosReducer'
import { getPhotos, createPhoto, updatePhoto, deletePhoto } from '../../api/photosApi'
import AddPhoto from './AddPhoto'
import PhotosGrid from './PhotosGrid'
import '../../css/Photos.css'

// כמה תמונות מביאים מהשרת בכל פעם
const PAGE_SIZE = 8

// הקומפוננטה הראשית של התמונות באלבום אחד - עם רדיוסר משלה.
// התמונות מגיעות מהשרת בחלקים: בפתיחה ובכל לחיצה על "טעינת עוד תמונות".
// children - כפתורים של האלבום עצמו (למשל "מחיקת אלבום") שמוצגים בשורת הכותרת
export default function Photos({ album, children }) {
  const [state, dispatch] = useReducer(photosReducer, initialState)
  const [error, setError] = useState('')

  // טעינת הדף הראשון כשהאלבום נפתח
  useEffect(() => {
    let ignore = false
    getPhotos(album.id, 0, PAGE_SIZE)
      .then((photos) => {
        if (!ignore) {
          dispatch({ type: 'ADD_PAGE', payload: { photos, hasMore: photos.length === PAGE_SIZE } })
        }
      })
      .catch(() => setError('טעינת התמונות נכשלה'))

    return () => {
      ignore = true
    }
  }, [album.id])

  // בכל פעולה: קודם השרת (photosApi), ורק אם הצליח - dispatch לרדיוסר

  async function handleLoadMore() {
    try {
      const photos = await getPhotos(album.id, state.lastLoadedId, PAGE_SIZE)
      dispatch({ type: 'ADD_PAGE', payload: { photos, hasMore: photos.length === PAGE_SIZE } })
      setError('')
    } catch {
      setError('טעינת התמונות נכשלה')
    }
  }

  async function handleAdd({ title, url }) {
    try {
      // אין לנו תמונה מוקטנת נפרדת - משתמשים באותו קישור
      const newPhoto = await createPhoto({ albumId: album.id, title, url, thumbnailUrl: url })
      dispatch({ type: 'ADD_PHOTO', payload: newPhoto })
      setError('')
    } catch {
      setError('הוספת התמונה נכשלה')
    }
  }

  async function handleEdit(id, { title, url }) {
    try {
      const updated = await updatePhoto(id, { title, url, thumbnailUrl: url })
      dispatch({ type: 'UPDATE_PHOTO', payload: updated })
      setError('')
    } catch {
      setError('עדכון התמונה נכשל')
    }
  }

  async function handleDelete(id) {
    try {
      await deletePhoto(id)
      dispatch({ type: 'DELETE_PHOTO', payload: id })
      setError('')
    } catch {
      setError('מחיקת התמונה נכשלה')
    }
  }

  return (
    <section className="photos">
      <div className="photos-header">
        <h2 className="photos-title">{album.title}</h2>
        <div className="photos-actions">
          <AddPhoto onAdd={handleAdd} />
          {children}
        </div>
      </div>

      {error && <p className="photos-error">{error}</p>}

      {state.isLoaded && state.photos.length === 0 && !state.hasMore ? (
        <p className="photos-empty">אין עדיין תמונות באלבום הזה</p>
      ) : (
        <PhotosGrid photos={state.photos} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      {state.isLoaded && state.hasMore && (
        <button type="button" className="photos-more-btn" onClick={handleLoadMore}>
          טעינת עוד תמונות
        </button>
      )}
    </section>
  )
}
