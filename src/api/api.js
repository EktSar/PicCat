import * as axios from "axios";

const clientId = 'eENzyfZ0gldbhV8fUtpQ1es2bwppeIGAn2acq4IAFac';

// Конкретный экземпляр axios, для настройки работы с одним api
const instance = axios.create({
  //withCredentials: true,
  baseURL: "https://api.unsplash.com/",
  // headers: {
  //   "API-KEY": "64081f82-c1c0-4b8a-96f6-e79085b2cc6a"
  // }
});

export const photosAPI = {
  getRandomPhotos(count = 10) {
    return instance.get(`/photos/random?client_id=${clientId}&count=${count}`).then(res => {
      console.log(res)
      return res.data});
  },
}

/*
export const usersAPI = {
  getUsers(pageNumber = 1, usersOnPageCount = 12) {
    // В instance уже хранятся настройки запроса
    return instance.get(`users?page=${pageNumber}&count=${usersOnPageCount}`)
      .then(response => response.data); // Возвращаем конкретно данные с сервера, без лишней информации о запросе
  },

  follow(userId) {
    return instance.post(`follow/${userId}`)
  },

  unfollow(userId) {
    // Запрос на сервер, что мы отписываемся
    return instance.delete(`follow/${userId}`)
  },

  // Страница профиля => Устаревший метод,
  getProfile(userId) {
    console.warn('Obsolete method. Please use profileAPI object');
    return profileAPI.getProfile(userId);
  },

  getUserPhoto(id) {
    return instance.get(`profile/` + id)
  },
}

// Интерфейс для профиля
export const profileAPI = {
  // Страница профиля
  getProfile(userId) {
    return instance.get(`profile/` + userId)
  },
  getStatus(userId) {
    return instance.get(`profile/status/` + userId)
  },
  updateStatus(status) {
    return instance.put(`profile/status`, { status: status }) // Отправляет объект с данными, которые нужны серверу
  },
  // Сохранение фото на сервере
  savePhoto(photoFile) {
    let formData = new FormData();
    formData.append('image', photoFile);

    return instance.put(`profile/photo`, formData)
  },
  saveProfile(profile) {
    return instance.put(`profile`, profile)
  }
}

// Авторизация пользователя
export const authAPI = {
  // Проверка авторизован ли пользователь
  me() {
    return instance.get(`auth/me`).then(response => response.data); // Тут возвращаются promise
  },
  // Авторизация пользователя
  login(email, password, rememberMe = false, captcha = null) {
    return instance.post(`auth/login`, { email, password, rememberMe, captcha})
      .then(response => response.data);
  },
  // Выход из сессии
  logout() {
    return instance.delete(`auth/login`).then(response => response.data);
  },
}
*/
