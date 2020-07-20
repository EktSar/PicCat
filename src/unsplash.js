import Unsplash from 'unsplash-js';

// Создаем экземпляр объекта для доступа к API
export const unsplash = new Unsplash({
  accessKey: "eENzyfZ0gldbhV8fUtpQ1es2bwppeIGAn2acq4IAFac",
  secret: "_3qK4clJYpmN7YHn2i_PBykP3YNKm_qWQG5rFCBJEbI",
  callbackUrl: "http://localhost:3000/auth" // Полный адрес страницы авторизации приложения (Redirect URI)

  // accessKey: "b-6eQP7VT2lxVBqAMab-oqO01vE-hTK1jl75oYLZDOg",
  // secret: "vcdbOBQICU_d8LWZEHWUnYXbNRgO4mweLrdUHtnZvVk",
  // callbackUrl: "http://localhost:3000/auth"
});
