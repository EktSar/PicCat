import {photosAPI} from "../api/api";

const SET_PHOTOS = 'skillbox-piccat/photo/SET_PHOTOS';
const TOGGLE_IS_LOADING = 'skillbox-piccat/photo/TOGGLE_IS_LOADING';

let initialState = {
  photos: [],
  photosOnPageCount: 10,
  isLoading: true,
}

const photoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PHOTOS:
      return {...state, photos: action.photos}

    case TOGGLE_IS_LOADING:
      return {...state, isLoading: action.isLoading}

    default:
      return state;
  }
}

// Action Creators
export const setPhotos = (photos) => ({type: SET_PHOTOS, photos})
export const toggleIsLoading = (isLoading) => ({type: TOGGLE_IS_LOADING, isLoading})

// Thunk Creators
export const getPhotos = (photosCount) => (dispatch) => {
  // Когда идет запрос на сервер
  dispatch(toggleIsLoading(true));

  // Запрос на сервер
  photosAPI.getRandomPhotos(photosCount).then(data => {
    dispatch(toggleIsLoading(false)); // Когда пришел ответ от сервера
    console.log(data);
    dispatch(setPhotos(data));
  })
}

// export const getUsersPagination = (pageNumber, usersOnPageCount) => {
//   return (dispatch) => {
//     // В this.props.currentPage на данный момент хранится еще старое число
//     dispatch(setCurrentPage(pageNumber)); // Тут мы его только передаем
//
//     dispatch(toggleIsFetching(true));
//
//     // Вместо строк ниже используется функция getUsers(), которая скрывает детали запроса
//     // axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.usersOnPageCount}`, {
//     //   withCredentials: true,
//     // })
//     usersAPI.getUsers(pageNumber, usersOnPageCount).then(data => {
//       dispatch(toggleIsFetching(false));
//       dispatch(setUsers(data.items));
//     })
//   }
// }
//
// export const follow = (userId) => { // Создание thunk
//   return (dispatch) => {
//     dispatch(toggleFollowingProgress(true, userId));
//
//     usersAPI.follow(userId).then(response => {
//       if (response.data.resultCode === 0) {
//         dispatch(followSuccess(userId))
//       }
//       dispatch(toggleFollowingProgress(false, userId));
//     })
//   }
// }
//
// export const unfollow = (userId) => { // Создание thunk
//   return (dispatch) => {
//     // disabled кнопку, чтобы предотвратить последующий запрос до завершения текущего
//     dispatch(toggleFollowingProgress(true, userId));
//
//     usersAPI.unfollow(userId).then(response => {
//       if (response.data.resultCode === 0) {
//         dispatch(unfollowSuccess(userId))
//       }
//       dispatch(toggleFollowingProgress(false, userId));
//     })
//   }
// }

export default photoReducer;