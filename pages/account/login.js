import Layout from "@/components/Layout";
import { useAuthContext } from "@/context/AuthContext";
import styles from "@/styles/AuthForm.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const LoginPage = () => {
  const { login, error } = useAuthContext();

  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({ ...prevData, [name]: value }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    login({ email: inputData?.email, password: inputData?.password });
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
