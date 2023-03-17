import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const rememberRef = useRef();
  const navigateTo = useNavigate();
  const [errors, setErrors] = useState(null);

  const { setUser, setToken } = useStateContext();

  const onSubmitLogin = (e) => {
    e.preventDefault();
    const payLoad = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      remember: rememberRef.current.value,
    };
    const url = "/auth/login";
    axiosClient
      .post(url, payLoad)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
        navigateTo('/');
      })
      .catch((err) => {
        const response = err.response;
        const errorMessage = response.data.errors;
        if (response && response.status === 422) {
          setErrors(errorMessage);
        }
      });
  };

  return (
    <div className="card">
      {errors && (
        <div className="card-header">
          <div className="alert alert-danger" role="alert">
            {Object.keys(errors).map((key) =>
              Object.keys(errors[key]).map((arr) => (
                <p key={key}>{errors[key][arr]}</p>
              ))
            )}
          </div>
        </div>
      )}
      <div className="card-body login-card-body">
        <p className="login-box-msg">Sign in to start your session</p>

        <form onSubmit={onSubmitLogin}>
          <div className="input-group mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              ref={emailRef}
            />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-envelope"></span>
              </div>
            </div>
          </div>
          <div className="input-group mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              ref={passwordRef}
            />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-lock"></span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-8">
              <div className="icheck-primary">
                <input type="checkbox" id="remember" ref={rememberRef} />
                <label htmlFor="remember">Remember Me</label>
              </div>
            </div>
            <div className="col-4">
              <button type="submit" className="btn btn-primary btn-block">
                Sign In
              </button>
            </div>
          </div>
        </form>

        <p className="mb-1">
          <a href="forgot-password.html">I forgot my password</a>
        </p>
        <p className="mb-0">
          <Link to="/sign-up" className="text-center">
            Register a new membership
          </Link>
        </p>
      </div>
    </div>
  );
}
