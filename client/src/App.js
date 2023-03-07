import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import CreateImage from "./pages/CreateImage";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PageNotFound from "./pages/PageNotFound";
import Registration from "./pages/Registration";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import TestPage from "./pages/Testpage";

import axios from "axios";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  // When page is refresh it would setState to true if accessToken
  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/valid", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          //Destructure the object to just change a single fill status
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
    // eslint-disable-next-line
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
    window.location.href = "/";
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          {!authState.status ? (
            <div>
              <Link to="/login">login </Link>
              <Link to="/registration">registrations </Link>
            </div>
          ) : (
            <div>
              <Link to="/">Home </Link>
              <Link to="/createpost">create a post </Link>
              <Link to="/createimage">create a image </Link>
              <Link to={`/profile/${authState.id}`}>your profile page</Link>
              <Link to="/testpage">create a post </Link>
            </div>
          )}
          <h1>{authState.username}</h1>
          {authState.status && <button onClick={logout}>logout!</button>}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createpost/:imageId" element={<CreatePost />} />
            <Route path="/createimage" element={<CreateImage />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/testpage" element={<TestPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
