import React, {useEffect, useState} from 'react';
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {setToken} from "./redux/authReducer";
import {compose} from "redux";
import {getAuthenticationUrl, setTokenEverywhere} from "./auth";
import Preloader from "./components/common/Preloader/Preloader";
import {getPhoto, getPhotos, likePhoto, unlikePhoto} from "./redux/photoReducer";
import Header from "./components/Header/Header";
import ModalPhoto from "./components/ModalPhoto/ModalPhoto";
import Photos from "./components/Photos";
import {unsplash} from "./unsplash";
import './App.css';

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
    // Считываем GET-параметр code из URL
    const code = props.location.search.split('code=')[1];

    // Если код передан, отправляем запрос на получение токена
    if (code) {
      setTokenEverywhere(code, props.setToken).then(token => {
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

    props.getPhotos(0);
  }, []); // TODO как сделать зависимости без зацикливания?

  if (!ready) {
    return <Preloader/>
  }

  return (
    <div className="container">
      <Header/>

      <Switch>
        <Route path="/photos/:photoId" exact>
          <Photos {...props} />
          <ModalPhoto location={props.location} history={props.history}
                      likePhoto={props.likePhoto} unlikePhoto={props.unlikePhoto}
                      likingInProgress={props.photo.likingInProgress}
                      photo={props.photo.photoById} getPhoto={props.getPhoto}/>
        </Route>

        <Route path="/" exact>
          <Photos {...props} />
        </Route>

        <Redirect to="/" />
      </Switch>

      {/*<Footer />*/}
    </div>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
  photo: state.photo,
})

export default compose(
  withRouter,
  connect(mapStateToProps, {setToken, getPhotos, likePhoto, unlikePhoto, getPhoto}))
(App);
