import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { Redirect } from "react-router-dom";

function SignIn() {
  const [userStatus, setUserStatus] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [err, setErr] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user != null) {
        setRedirect(true);
        setUserStatus(user);
      } else setUserStatus(null);
    });
  }, [userStatus]);

  const handleEmail = e => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePassword = e => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        // console.log(res.M.code);
      })
      .catch(err => {
        setErr(true);
      });
  };

  return (
    <>
      {redirect ? (
        <Redirect to="/" />
      ) : (
        <>
          <div className="body">
            <div className="cont">
              <div className="form">
                <form onSubmit={handleSubmit}>
                  <h1 className="h1">Login</h1>
                  <input
                    id="email"
                    type="text"
                    className="user"
                    placeholder="Email"
                    onChange={handleEmail}
                  />
                  <input
                    id="password"
                    type="password"
                    className="pass"
                    placeholder="Password"
                    onChange={handlePassword}
                  />
                  <button className="login" onClick={handleSubmit}>
                    Login
                  </button>
                  {err ? (
                    <div className="alert alert-danger">
                      Sorry, Wrong Credentials :(
                    </div>
                  ) : (
                    <></>
                  )}
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default SignIn;
