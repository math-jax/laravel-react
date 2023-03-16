import { Outlet, Link } from "react-router-dom";

export default function AuthLayout() {
  return (
    <body class="hold-transition login-page">
      <div class="login-box">
        <div class="login-logo">
          <Link to={"/"}>
            <b>Admin</b> Panel
          </Link>
        </div>
        <div class="card">
          <Outlet></Outlet>
        </div>
      </div>
    </body>
  )
}