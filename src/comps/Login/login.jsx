import React, { useState, useRef } from "react";
import "./login.css";

const Login = ({ login }) => {
  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [urlAvatar, setUrlAvatar] = useState("");

  const errorMessageUsername = useRef(null);
  const errorMessagePassword = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();
    
    if (validName && validPassword) {
      login(name, password, urlAvatar);
    } 
    if (!validName) {
      errorMessageUsername.current.classList.remove('hide')
      setTimeout(() => errorMessageUsername.current.classList.add('hide'), 4000);
    }
    if (!validPassword) {
      errorMessagePassword.current.classList.remove('hide')
      setTimeout(() => errorMessagePassword.current.classList.add('hide'), 4000);
    }
  };

  const handlerChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
    const isValid = validatePassword(password);
    setValidPassword(isValid);
  };

  const handlerChangeName = (e) => {
    const username = e.target.value;
    setName(username);
    fetchAvatarGithub(username);
  };

  const fetchAvatarGithub = (name) => {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const targetUrl = `https://github.com/${name}.png?size=40`;

    fetch(proxyUrl + targetUrl)
      .then((res) => res.blob())
      .then((blob) => {
        if (blob.type === "image/png" || blob.type === "image/jpeg") {
          setValidName(true);
          setUrlAvatar(`https://github.com/${name}.png?size=40`);
        } else {
          setValidName(false);
        }
      })
      .catch((err) => {
        setValidName(false);
      });
  };

  const validatePassword = (pass) => {
    const passRegex = new RegExp(
      /(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g
    );
    return passRegex.test(pass);
  };

  return (
    <div className="login__outer">
      <div className="login__messages">
        <div className="login__error-username hide" ref={errorMessageUsername}>
          Введите имя пользователя github
      </div>
      <div className="login__error-password hide" ref={errorMessagePassword}>
          Пароль должен быть минимум 8 символов и содержать одну цифру и заглавную букву
      </div>
      </div>
      
      <div className="login">
      
      <form className="login__form" onSubmit={handleLogin}>
        <div
          className="login__avatar"
          style={{
            backgroundImage: `url(https://github.com/${name}.png?size=40)`,
          }}
        ></div>

        <label htmlFor="name" className="login__label">
          Username
          <input
            type="text"
            id="name"
            value={name}
            onChange={handlerChangeName}
            className={validName ? "login__input" : "login__input--error"}
            placeholder="Name"
          />
        </label>

        <label htmlFor="inputPassword" className="login__label">
          Password
          <input
            type="password"
            id="inputPassword"
            value={password}
            onChange={handlerChangePassword}
            className={validPassword ? "login__input" : "login__input--error"}
            placeholder="Password"
          />
        </label>

        <button className="button--default" type="submit">
          Sign in
        </button>
      </form>
      
    </div>
    </div>
   
  );
};

export default Login;
