import React, { useState } from "react";
import "./login.css";

const Login = ({ login }) => {
  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [urlAvatar, setUrlAvatar] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (validName && validPassword) {
      login(name, password, urlAvatar);
      
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
    <div className="login">
      <form className="login__form" onSubmit={handleLogin}>
        <div
          className="login__avatar"
          style={{
            backgroundImage: `url(https://github.com/${name}.png?size=40)`,
          }}
        ></div>

        <label htmlFor="name" className="login__label">
          Email address
          <input
            type="text"
            id="name"
            value={name}
            onChange={handlerChangeName}
            className={validName ? "login__input" : "login__input--error"}
            placeholder="Name"
            required
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
            required
          />
        </label>

        <button className="button--default" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
