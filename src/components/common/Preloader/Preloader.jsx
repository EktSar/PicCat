import React from 'react';
import {Spinner} from "react-bootstrap";
import classes from "./Preloader.module.css";

export default ({isCenter = true, color = "dark"}) => {
  return <>
    {isCenter
      ? <div className={classes.wrapperCenter}>
        <Spinner animation="border" variant={color} className={classes.spinner}>
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>

      : <div className={classes.wrapper}>
        <Spinner animation="border" variant={color} className={classes.spinner}>
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    }
  </>
}