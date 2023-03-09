import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ authState, logout }) => {
  return (
    <div className="navbar bg-base-100 px-32 m-4">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {authState.status ? (
              <React.Fragment>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/createimage">Generate Image</Link>
                </li>
                <li>
                  <Link to={`/profile/${authState.id}`}>Profile</Link>
                </li>
                <li>
                  <Link to="/testpage">Test Page</Link>
                </li>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li>
                  <Link to="/registration">Not a member yet?</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-xl">
          <Link to="/">CosmoVision.ai</Link>
        </a>
      </div>
      <div className="navbar-end">
        <div>
          {authState.status ? (
            <div>
              {authState.status && <button onClick={logout}>logout: </button>}
              <button className="btn ml-4 gap-2" onClick={logout}>
                Hi!
                <div className="badge badge-secondary">
                  {authState.username}
                </div>
              </button>
            </div>
          ) : (
            <div>
              <Link className="link pr-5 text-sm" to="/registration">
                Not a member yet?
              </Link>

              <Link className=" btn" to="/login">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
