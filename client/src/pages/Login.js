import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import LoginForm from "../components/LoginForm";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);
  let navigate = useNavigate();

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
        return;
      } else localStorage.setItem("accessToken", response.data.token);
      setAuthState({
        username: response.data.username,
        id: response.data.id,
        status: true,
      });
      navigate("/");
    });
  };
  return (
    <div className="h-screen w-screen">
      <LoginForm
        title="Login"
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        onLogin={login}
      />
    </div>
  );
};

export default Login;
