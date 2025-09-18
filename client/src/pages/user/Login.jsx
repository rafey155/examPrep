import React, { useState } from "react";
import axios from "axios";
import BASE_URL from "../../config/baseUrl";
import img from "../../assets/images/imagelogo.jpg";

const Login = () => {
  const styles = {
    page: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #6e00ff, #8e2de2, #4a00e0)",
      fontFamily: "Segoe UI, sans-serif",
    },
    card: {
      width: "950px",
      height: "580px",
      display: "flex",
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
      backgroundColor: "#fff",
    },
    leftPanel: {
      flex: 1,
      background: "linear-gradient(135deg, #6e00ff, #8e2de2, #4a00e0)",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      padding: "40px",
      textAlign: "center",
    },
    image: {
      width: "80%",
      maxWidth: "300px",
      marginBottom: "20px",
      zIndex: 1,
    },
    welcomeText: {
      fontSize: "30px",
      fontWeight: "600",
      marginBottom: "10px",
      zIndex: 1,
    },
    subText: {
      fontSize: "16px",
      opacity: 0.9,
      zIndex: 1,
    },
    rightPanel: {
      flex: 1,
      backgroundColor: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px",
    },
    formBox: {
      width: "100%",
      maxWidth: "320px",
    },
  };
  const [data, setData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${BASE_URL}/api/examinee/login`, data);
    if (res.data.message === "Login Successfully") {
      localStorage.setItem("userRole", res.data.user.role);
      localStorage.setItem("userEmail", res.data.user.email);
      localStorage.setItem("userId", res.data.user.id);
      window.location.href = "/user/";
    }
  };

  const handleRegisterRedirect = () => {
    window.location.href = "/user/registration";
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.leftPanel}>
          <img src={img} alt="Logo" style={styles.image} />
          <div style={styles.welcomeText}>Welcome Back!</div>
          <div style={styles.subText}>
            Login to access your account and exams.
          </div>
        </div>
        <div style={styles.rightPanel}>
          <div style={styles.formBox}>
            <h2 className="mb-4 text-center">User Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 mb-2">
                Login
              </button>
            </form>
            <button
              onClick={handleRegisterRedirect}
              className="btn btn-outline-secondary w-100 mt-2"
            >
              New user? Register here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
