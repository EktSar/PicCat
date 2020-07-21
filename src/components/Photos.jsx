import React from "react";
import Preloader from "./common/Preloader/Preloader";
import Photo from "./Photo/Photo";
import InfiniteScroll from "react-infinite-scroll-component";

export default (props) => {
  const fetchPhotos = () => {
    debugger
    props.getPhotos(props.photo.photos.length)
  }

  return <main>
    <h1>PicCat - фото на любой вкус</h1>

    <InfiniteScroll
      dataLength={props.photo.photos.length}
      next={fetchPhotos}
      hasMore={true}
      loader={<Preloader isCenter={false}/>}
    >
      <div className="masonry-container">
        {props.photo.photos.map(photo => (
          <Photo url={photo.urls.regular} key={photo.id} photoId={photo.id} user={photo.user} date={photo.created_at}
                 likes={photo.likes} likedByUser={photo.liked_by_user}
                 likePhoto={props.likePhoto} unlikePhoto={props.unlikePhoto}
                 likingInProgress={props.photo.likingInProgress}/>
        ))}
      </div>
    </InfiniteScroll>
  </main>
}