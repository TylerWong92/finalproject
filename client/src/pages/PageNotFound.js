import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      <h1>Page Not Found</h1>
      <h1>
        Go to :<Link to="/">Home </Link>
      </h1>
    </div>
  );
};

export default PageNotFound;
