import { Container } from "postcss";
import React from "react";

const TestPage = () => {
  return (
    <section className="h-screen w-screen bg-gradient-to-r from-slate-700 to-slate-800">
      <div className="flex items-center justify-center h-full">
        <fieldset>
          <label className="label">
            <span className="label-text">Login</span>
            <span className="label-text-alt">not a member yet?</span>
          </label>
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered input-ghost w-full max-w mb-4"
          />

          <input
            type="text"
            placeholder="Password"
            className="input input-bordered input-ghost w-full max-w mb-4"
          />

          <button className="btn btn-block btn-outline">Login</button>
        </fieldset>
      </div>
    </section>
  );
};

export default TestPage;
