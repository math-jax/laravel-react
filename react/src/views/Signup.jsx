import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";



export default function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const navigateTo = useNavigate();

  const [errors, setErrors] = useState(null);

  const { setUser, setToken } = useStateContext();

  const onSubmitSignup = (e) => {
    e.preventDefault();
    const payLoad = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    };
    const url = "/auth/signup";
    axiosClient
      .post(url, payLoad)
      .then(({ data }) => {
        if (data.status === 200) {
          setUser(data.user);
          setToken(data.token);
          navigateTo('/');
        }
      })
      .catch((err) => {
        const response = err.response;
        const errorMessage = response.data.errors;
        setErrors(errorMessage);
        if (response && response.status === 422) {
          setErrors(errorMessage);
        }
      });
  };

  return (
    <div className="card">
      {errors && (
        <div className="card-header">
          <div className="alert alert-danger"  role="alert">
            {Object.keys(errors).map((key) =>
              Object.keys(errors[key]).map((arr) => (
                <p key={key}>{errors[key][arr]}</p>
              ))
            )}
          </div>
        </div>
      )}
      <div className="card-body register-card-body">
        <p className="login-box-msg">Register a new membership</p>
        <form onSubmit={onSubmitSignup}>
          <div className="input-group mb-3">
            <input
              ref={nameRef}
              type="text"
              className="form-control"
              placeholder="Full name"
            />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-user"></span>
              </div>
            </div>
          </div>
          <div className="input-group mb-3">
            <input
              ref={emailRef}
              type="email"
              className="form-control"
              placeholder="Email"
            />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-envelope"></span>
              </div>
            </div>
          </div>
          <div className="input-group mb-3">
            <input
              ref={passwordRef}
              type="password"
              className="form-control"
              placeholder="Password"
            />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-lock"></span>
              </div>
            </div>
          </div>
          <div className="input-group mb-3">
            <input
              ref={passwordConfirmationRef}
              type="password"
              className="form-control"
              placeholder="Retype password"
            />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-lock"></span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button type="submit" className="btn btn-primary btn-block">
                Register
              </button>
            </div>
          </div>
        </form>

        <Link to="/login" className="text-center">
          I already have a membership
        </Link>
      </div>
    </div>
  );
}
