import { useState } from "react";
import "./Auth.css";
import icon from "../../assets/icon.png";
import AboutAuth from "./AboutAuth";
import { signup, login } from "../../actions/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSwitch = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email && !password) {
      alert("Enter email and password");
    }
    if (isSignUp) {
      if (!name) {
        alert("Enter a name to continue");
      }
      dispatch(signup({ name, email, password }, navigate));
    } else {
      dispatch(login({ email, password }, navigate));
    }
  };

  return (
    <section className="auth-section">
      {isSignUp && <AboutAuth />}
      <div className="auth-container-2">
        {!isSignUp && (
          <img src={icon} alt="stack-overflow" className="login-logo" />
        )}
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <label htmlFor="name">
              <h4>Display Name</h4>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="off"
              />
            </label>
          )}
          <label htmlFor="email">
            <h4>Email</h4>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
          </label>
          <label htmlFor="password">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>Password</h4>

              {!isSignUp && (
                <p style={{ color: "#007ac6", fontSize: "13px" }}>
                  forgot password?
                </p>
              )}
            </div>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {isSignUp && (
            <p style={{ color: "#666767", fontSize: "13px" }}>
              Password must contain at least eight
              <br /> characters, including at least 1 letter and 1 <br />
              number
            </p>
          )}
          {isSignUp && (
            <label
              htmlFor="check"
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "15px",
              }}
            >
              <input
                type="checkbox"
                id="check"
                style={{ width: "20px", marginTop: "15px" }}
              />
              <p style={{ fontSize: "13px" }}>
                Opt-in to receive occasional,
                <br />
                product updates,user research invitations,
                <br />
                company announcements, and digests.
              </p>
            </label>
          )}
          <button type="submit" className="auth-btn">
            {isSignUp ? "Sign Up" : "Log in"}
          </button>
          {isSignUp && (
            <p style={{ color: "#666767", fontSize: "13px" }}>
              By clicking "Sign up", you agree to our
              <span style={{ color: "#007ac6" }}>
                {" "}
                terms of <br />
                service
              </span>
              ,<span style={{ color: "#007ac6" }}>privacy policy</span> and{" "}
              <span style={{ color: "#007ac6" }}>cookie policy</span>{" "}
            </p>
          )}
        </form>
        <p>
          {isSignUp ? "already have an account?" : "Don't have an account?"}
          <button
            type="button"
            className="handle-switch-btn"
            onClick={handleSwitch}
          >
            {isSignUp ? "Log in" : "Sign up"}
          </button>
        </p>
      </div>
    </section>
  );
};

export default Auth;
