import {unsplash} from "./unsplash";

export const setTokenEverywhere = async (code, setToken) => {
  // Возвращается Promise
  return await unsplash.auth.userAuthentication(code)
    .then(res => {
      if (res.status === 403) {
        return {error: 'Rate Limit Exceeded'};
      }
      return res.json();
    })
    .then(json => {
      // Сохраняем полученный токен
      const token = json.access_token;

      console.log(json);

      // Если токен пришел с сервера
      if (token) {
        unsplash.auth.setBearerToken(token);
        localStorage.setItem('userData', JSON.stringify({token})); // Данные сохраняются в локальное хранилище браузера
        setToken(token);
        return token;
      }

      return null;
      // Теперь можно сделать что-то от имени пользователя
      // Например, поставить лайк фотографии
      //unsplash.photos.likePhoto("kBJEJqWNtNY");
    });
}

export const getAuthenticationUrl = () => {
  // Генерируем адрес страницы аутентификации на unsplash.com и указываем требуемые разрешения (permissions)
  const authenticationUrl = unsplash.auth.getAuthenticationUrl([
    "public",
    "write_likes"
  ]);

  // Отправляем пользователя по этому адресу
  window.location.assign(authenticationUrl);
}