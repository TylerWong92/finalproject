import React from "react";

const TestPage = () => {
  return (
    <fieldset>
      <div className="bg-gray-600 inline-block rounded-2xl p-4">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Username</span>
          </label>

          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />

          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
          <label className="label">
            <span className="label-text-alt">Bottom Left label</span>
            <span className="label-text-alt">Bottom Right label</span>
          </label>
          <button className="btn btn-block">block</button>
        </div>
      </div>
    </fieldset>
  );
};

export default TestPage;

// <span className="label-text-alt">Top Right label</span>
// <label className="label">
// <span className="label-text-alt">Bottom Left label</span>
// <span className="label-text-alt">Bottom Right label</span>
// </label>
