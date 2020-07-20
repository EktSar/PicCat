import React from 'react';
import {Spinner} from "react-bootstrap";
import classes from "./Preloader.module.css";

export default () => {
  return (
    <div className={classes.wrapper}>
      <Spinner animation="border" variant="dark" className={classes.spinner}>
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  )
}