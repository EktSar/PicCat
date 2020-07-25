import * as axios from "axios";
import {unsplash} from "../unsplash";

//const clientId = 'eENzyfZ0gldbhV8fUtpQ1es2bwppeIGAn2acq4IAFac';
const clientId = 'b-6eQP7VT2lxVBqAMab-oqO01vE-hTK1jl75oYLZDOg';

// Конкретный экземпляр axios, для настройки работы с одним api
const instance = axios.create({
  baseURL: "https://api.unsplash.com/",
});

export const photosAPI = {
  getRandomPhotos(length, count = 10,) {
    //const page = (length * 2) / count;

    return instance.get(`/photos/random?client_id=${clientId}&count=${count}`).then(res => {
    // return instance.get(`/photos?client_id=${clientId}&page=${page}&per_page=${count}`).then(res => {
      return res.data
    });
  },

  getPhotoById(photoId) {
    return instance.get(`/photos/${photoId}?client_id=${clientId}`).then(res => res.data);
  },

  likePhoto(photoId) {
    return unsplash.photos.likePhoto(`${photoId}`).then(res => {
      if (res.status !== 201) {
        return {error: 'Возникла ошибка!'};
      }
      return res.json();
    })
    // return instance.post(`/photos/${photoId}/like`).then(res => res.data);
  },

  unlikePhoto(photoId) {
    return unsplash.photos.unlikePhoto(`${photoId}`).then(res => {
      if (res.status !== 200) {
        return {error: 'Возникла ошибка!'};
      }
      return res.json();
    })
    //return instance.delete(`/photos/${photoId}/like`).then(res => res.data);
  },
}
