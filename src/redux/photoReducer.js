import {photosAPI} from "../api/api";

const SET_PHOTOS = 'skillbox-piccat/photo/SET_PHOTOS';
const SET_PHOTO = 'skillbox-piccat/photo/SET_PHOTO';
const TOGGLE_IS_LOADING = 'skillbox-piccat/photo/TOGGLE_IS_LOADING';
const TOGGLE_IS_LIKING_PROGRESS = 'skillbox-piccat/photo/TOGGLE_IS_LIKING_PROGRESS';
const LIKE_UNLIKE = 'skillbox-piccat/photo/LIKE_UNLIKE';

let initialState = {
  photos: [],
  photosOnPageCount: 10,
  isLoading: true,
  likingInProgress: [], // Массив тех id, которые в процессе liking
  photoById: null,
}

const photoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PHOTOS:
      return {...state, photos: [...state.photos, ...action.photos]}

    case SET_PHOTO:
      return {...state, photoById: action.photo}

    case TOGGLE_IS_LOADING:
      return {...state, isLoading: action.isLoading}

    case TOGGLE_IS_LIKING_PROGRESS:
      return {
        ...state,
        likingInProgress: action.isLoading
          ? [...state.likingInProgress, action.photoId] // Дописываем в массив id того фото, которое обрабатывается сервером
          : state.likingInProgress.filter(id => id !== action.photoId) // Фильтрация вернет новый массив, без того id, чей лайк поставлен
      }

    case LIKE_UNLIKE:
      return {
        ...state,

        photos: state.photos.map(photo => {
          if (photo.id === action.photoId) {
            return {...photo, liked_by_user: action.liked_by_user, likes: action.likes}
          }
          return photo;
        }),
      }

    default:
      return state;
  }
}

// Action Creators
export const setPhotos = (photos) => ({type: SET_PHOTOS, photos})
export const setPhoto = (photo) => ({type: SET_PHOTO, photo})
export const toggleIsLoading = (isLoading) => ({type: TOGGLE_IS_LOADING, isLoading})
export const toggleLikingProgress = (isLoading, photoId) => ({
  type: TOGGLE_IS_LIKING_PROGRESS, isLoading, photoId
})
export const likeUnlike = (photoId, liked_by_user, likes) => ({type: LIKE_UNLIKE, photoId, liked_by_user, likes})

// Thunk Creators
export const getPhotos = (length, photosCount) => (dispatch) => {
  // Когда идет запрос на сервер
  dispatch(toggleIsLoading(true));

  // Запрос на сервер
  photosAPI.getRandomPhotos(length, photosCount).then(data => {
    dispatch(toggleIsLoading(false)); // Когда пришел ответ от сервера
    dispatch(setPhotos(data));
  })
}

export const getPhoto = (id) => (dispatch) => {
  dispatch(toggleIsLoading(true));

  photosAPI.getPhotoById(id).then(data => {
    dispatch(toggleIsLoading(false));
    dispatch(setPhoto(data));
  })
}

export const likePhoto = (photoId) => (dispatch) => {
  dispatch(toggleLikingProgress(true, photoId));

  photosAPI.likePhoto(photoId).then(res => {
    if (!res.error && res.photo.id) {
      dispatch(likeUnlike(res.photo.id, res.photo.liked_by_user, res.photo.likes))
    }
    dispatch(toggleLikingProgress(false, photoId));
  })
}

export const unlikePhoto = (photoId) => (dispatch) => {
  // disabled кнопку, чтобы предотвратить последующий запрос до завершения текущего
  dispatch(toggleLikingProgress(true, photoId));

  photosAPI.unlikePhoto(photoId).then(res => {
    if (!res.error && res.photo.id) {
      dispatch(likeUnlike(res.photo.id, res.photo.liked_by_user, res.photo.likes))
    }
    dispatch(toggleLikingProgress(false, photoId));
  })
}

export default photoReducer;
