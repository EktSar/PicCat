import React from 'react';

export default ({url}) => {
  return (
    // <div className="col-md-3 col-sm-3 col-xs-6 item">
    <div className="foo">
      <img src={url} alt="Фото" className="photo"/>
    </div>
  )
}