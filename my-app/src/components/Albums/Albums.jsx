import { useEffect, useReducer, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { albumsReducer, initialState } from './albumsReducer'
import { getAlbums, createAlbum, deleteAlbum } from '../../api/albumsApi'
import AlbumsSidebar from './AlbumsSidebar'
import DeleteAlbum from './DeleteAlbum'
import Photos from '../Photos/Photos'
import '../../css/Albums.css'

// הקומפוננטה הראשית של האלבומים.
// מחזיקה את הרדיוסר ומדברת עם השרת, ומרנדרת:
// 1. AlbumsSidebar - חיפוש + אלבום חדש + רשימת האלבומים
// 2. Photos        - התמונות של האלבום שנבחר (עם רדיוסר משלהן)
//
// האלבום שנבחר נקרא מהכתובת:
//   /Bret/albums           - בלי אלבום נבחר
//   /Bret/albums/2/photos  - התמונות של אלבום 2
export default function Albums({ user }) {
  const [state, dispatch] = useReducer(albumsReducer, initialState)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { albumId } = useParams()
  const albumsUrl = `/${user.username}/albums`

  // טעינת האלבומים של המשתמש מהשרת כשהעמוד נפתח
  useEffect(() => {
    let ignore = false
    getAlbums(user.id)
      .then((albums) => {
        if (!ignore) dispatch({ type: 'SET_ALBUMS', payload: albums })
      })
      .catch(() => setError('טעינת האלבומים נכשלה'))

    return () => {
      ignore = true
    }
  }, [user.id])

  // בכל פעולה: קודם השרת (albumsApi), ורק אם הצליח - dispatch לרדיוסר

  async function handleAdd(title) {
    try {
      const newAlbum = await createAlbum({ userId: user.id, title })
      dispatch({ type: 'ADD_ALBUM', payload: newAlbum })
      setError('')
      navigate(`${albumsUrl}/${newAlbum.id}/photos`) // האלבום החדש נפתח
    } catch {
      setError('יצירת האלבום נכשלה')
    }
  }

  async function handleDelete(id) {
    try {
      await deleteAlbum(id)
      dispatch({ type: 'DELETE_ALBUM', payload: id })
      setError('')
      navigate(albumsUrl) // האלבום שהוצג נמחק - חוזרים לרשימה
    } catch {
      setError('מחיקת האלבום נכשלה')
    }
  }

  // בחירת אלבום - רק משנים את הכתובת
  function handleSelect(id) {
    navigate(`${albumsUrl}/${id}/photos`)
  }

  // ה-id בכתובת הוא טקסט, ולכן משווים כטקסט.
  // מחפשים רק באלבומים של המשתמש - אלבום של מישהו אחר לא יימצא
  const selectedAlbum = state.albums.find((a) => String(a.id) === albumId)

  return (
    <section className="albums">
      <AlbumsSidebar
        albums={state.albums}
        selectedId={selectedAlbum?.id}
        onSelect={handleSelect}
        onAdd={handleAdd}
      />

      <div className="albums-main">
        {error && <p className="albums-error">{error}</p>}

        {selectedAlbum ? (
          // key - כדי שבמעבר לאלבום אחר התמונות יתחילו מאפס
          <Photos key={selectedAlbum.id} album={selectedAlbum}>
            {/* כפתור של האלבום עצמו - מוצג בשורת הכותרת של התמונות */}
            <DeleteAlbum id={selectedAlbum.id} onDelete={handleDelete} />
          </Photos>
        ) : (
          <p className="albums-empty">בחרו אלבום מהרשימה כדי לראות את התמונות</p>
        )}
      </div>
    </section>
  )
}
