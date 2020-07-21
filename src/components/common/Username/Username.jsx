import React from "react";
import classes from "./Username.module.css";

export default ({username, link, profileImage}) => {
  return (
    <div className={classes.username}>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img src={profileImage} alt="Аватар" className={classes.profileImage} />
      </a>
      <a href={link} target="_blank" rel="noopener noreferrer">
        {username}
      </a>
    </div>
  )
}