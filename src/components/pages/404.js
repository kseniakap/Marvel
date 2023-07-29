import React from "react";
import { Link } from "react-router-dom";
import ErrorMessage from "../errorMessage/ErrorMessage";
const Page404 = () => {
  return (
    <div>
      <ErrorMessage />
      <p style={{ display: "block", textAlign: "center", fontSize: "26px" }}>
        Sorry...This page doesn't exist...
      </p>
      <Link
        style={{
          display: "block",
          textAlign: "center",
          fontSize: "26px",
          marginTop: "15px",
          color: "#9F0013",
        }}
        to="/"
      >
        Back to main page
      </Link>
    </div>
  );
};

export default Page404;
