import React from "react";
import logo from "../../assets/img/logo.png"

export default () => {
  return (
    <header>
      <img src={logo} alt="Лого" className="logo"/>
      <span>PicCat</span>
    </header>
  )
}