import React from "react";

const LoginForm = ({
  title,
  username,
  setUsername,
  password,
  setPassword,
  onLogin,
}) => {
  return (
    <div className="flex items-center justify-center h-full">
      <fieldset>
        <label className="label">
          <span className="label-text">{title}</span>
          <span className="label-text-alt">not a member yet?</span>
        </label>
        <input
          type="text"
          placeholder="Username"
          className="input input-bordered input-ghost w-full max-w mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="input input-bordered input-ghost w-full max-w mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-block btn-outline" onClick={onLogin}>
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default LoginForm;
