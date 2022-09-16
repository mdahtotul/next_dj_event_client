import Layout from "@/components/Layout";
import styles from "@/styles/AuthForm.module.css";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { ToastContainer } from "react-toastify";

const LoginPage = () => {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <Layout title="Login">
      <div className={styles.auth}>
        <h1>
          <FaUser /> Log In
        </h1>

        <ToastContainer theme="colored" />

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={inputData.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.input_div}>
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              className={styles.pass}
              value={inputData.password}
              onChange={handleChange}
            />

            {showPassword ? (
              <AiOutlineEyeInvisible
                className={styles.eye}
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <AiOutlineEye
                className={styles.eye}
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>

          <input type="submit" value="Login" className="btn" />
        </form>

        <p>
          {`Don't have an account? `}{" "}
          <Link href="/account/register">Register</Link>{" "}
        </p>
      </div>
    </Layout>
  );
};

export default LoginPage;
