import React, {useEffect, useState} from 'react';
import './App.css';
import {withRouter, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {setToken} from "./redux/authReducer";
import {compose} from "redux";
import {unsplash} from "./unsplash";
import {getAuthenticationUrl, setTokenEverywhere} from "./auth";
import Preloader from "./components/Preloader/Preloader";
import {getPhotos} from "./redux/photoReducer";
import Photo from "./components/Photo/Photo";

function App(props) {
  const [ready, setReady] = useState(false);

  const getAuthentication = () => {
    const data = JSON.parse(localStorage.getItem('userData'));

    // Если токен есть в localStorage
    if (data && data.token) {
      unsplash.auth.setBearerToken(data.token);
      props.setToken(data.token);
      setReady(true);
    } else {
      // Авторизация через unsplash
      getAuthenticationUrl();
    }
  }

  // При загрузке проверка хуком локального хранилища, запись в локальное состояние
  useEffect(() => {
    console.log(props)
    // Считываем GET-параметр code из URL
    const code = props.location.search.split('code=')[1];

    // Если код передан, отправляем запрос на получение токена
    if (code) {
      setTokenEverywhere(code, props.setToken).then(token => {
        console.log(token);

        // Если токен был получен
        if (token) {
          setReady(true);
        } else {
          // Если произошла ошибка в получении токена
          getAuthentication();
        }
      });
    } else {
      getAuthentication();
    }

    props.getPhotos();

  }, []); // TODO как сделать зависимости без зацикливания?

  if (!ready) {
    return <Preloader/>
  }

  console.log('App')
  return (
    <div className="container">
      <div>Header</div>
      <Switch>
        <Route path="/photos" exact>
          <h1>Фото</h1>
        </Route>

        <Route path="*">
          <h1>Заголовок</h1>

          {props.photo.isLoading
            ? <Preloader/>
            : <div className="masonry-container row">
              {props.photo.photos.map(photo => (
                <Photo url={photo.urls.thumb} key={photo.id}/>
              ))}
            </div>
          }

          <div className="masonry-container row">
            <div className="item">
              <img src="https://s3.amazonaws.com/clarifai-img/demo/889/88940833.jpg"/>
            </div>
            <div className="item">
              <img src="https://s3.amazonaws.com/clarifai-img/demo/907/90775901.jpg"/>
            </div>
            <div className="item">
              <img src="https://s3.amazonaws.com/clarifai-img/demo/294/29489326.jpg"/>
            </div>
            <div className="item ">
              <img src="https://s3.amazonaws.com/clarifai-img/demo/100/100656385.jpg"/>
            </div>
            <div className="item ">
              <img src="https://s3.amazonaws.com/clarifai-img/demo/889/88940839.jpg"/>
            </div>
            <div className="item ">
              <img src="https://s3.amazonaws.com/clarifai-img/demo/111/111773987.jpg"/>
            </div>
            <div className="item ">
              <img src="https://s3.amazonaws.com/clarifai-img/demo/146/146371016.jpg"/>
            </div>
          </div>
        </Route>
      </Switch>
    </div>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
  photo: state.photo,
})

export default compose(
  withRouter,
  connect(mapStateToProps, {setToken, getPhotos}))
(App);
