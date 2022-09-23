import Layout from "@/components/Layout";
import LoginAlready from "@/components/LoginAlready";
import { useAuthContext } from "@/context/AuthContext";
import styles from "@/styles/AuthForm.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const LoginPage = () => {
  const { user, login, error } = useAuthContext();

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

    login({ email: inputData?.email, password: inputData?.password });
  };

  useEffect(() => {
    if (error?.status || error?.msg) {
      if (error?.status) {
        toast.error(`Status Code ${error.status} ::: ${error.msg}`);
      } else {
        toast.error(error.msg);
      }
    }
  }, [error]);

  return (
    <Layout title="Login">
      {!user?.username && !user?.email ? (
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
      ) : (
        <LoginAlready text="login" />
      )}
    </Layout>
  );
};

export default LoginPage;
