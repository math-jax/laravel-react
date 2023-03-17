import React, { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";


export default function AuthLayout() {

  useEffect(() => {
    document.body.classList.add("hold-transition");
    document.body.classList.add("login-page");

    return () => {
      document.body.classList.remove("hold-transition");
      document.body.classList.remove("login-page");
    };
  }, []);

  return (
      <div className="login-box">
        <div className="login-logo">
          <Link to={"/"}>
            <b>Admin</b> Panel
          </Link>
        </div>
        <div className="card">
          <Outlet></Outlet>
        </div>
      </div>
  )
}
