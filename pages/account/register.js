import Layout from "@/components/Layout";
import LoginAlready from "@/components/LoginAlready";
import { useAuthContext } from "@/context/AuthContext";
import styles from "@/styles/AuthForm.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const RegisterPage = () => {
  const { user, register, error } = useAuthContext();

  const [inputData, setInputData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const [showPassword, setShowPassword] = useState({
    pass1: false,
    pass2: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, password2 } = inputData;

    if (password !== password2) {
      toast.error("Passwords do not match");
      return;
    }
    register({ username, email, password });
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
    <Layout title="Register">
      {!user?.username && !user?.email ? (
        <div className={styles.auth}>
          <h1>
            <FaUser /> Register
          </h1>

          <ToastContainer theme="colored" />

          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={inputData.username}
                onChange={handleChange}
              />
            </div>
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
                type={showPassword.pass1 ? "text" : "password"}
                name="password"
                id="password"
                className={styles.pass}
                value={inputData.password}
                onChange={handleChange}
              />

              {showPassword.pass1 ? (
                <AiOutlineEyeInvisible
                  className={styles.eye}
                  onClick={() =>
                    setShowPassword({ ...showPassword, pass1: false })
                  }
                />
              ) : (
                <AiOutlineEye
                  className={styles.eye}
                  onClick={() =>
                    setShowPassword({ ...showPassword, pass1: true })
                  }
                />
              )}
            </div>
            <div className={styles.input_div}>
              <label htmlFor="password2">Confirm Password</label>
              <input
                type={showPassword.pass2 ? "text" : "password"}
                name="password2"
                id="password2"
                className={styles.pass}
                value={inputData.password2}
                onChange={handleChange}
              />

              {showPassword.pass2 ? (
                <AiOutlineEyeInvisible
                  className={styles.eye}
                  onClick={() =>
                    setShowPassword({ ...showPassword, pass2: false })
                  }
                />
              ) : (
                <AiOutlineEye
                  className={styles.eye}
                  onClick={() =>
                    setShowPassword({ ...showPassword, pass2: true })
                  }
                />
              )}
            </div>

            <input type="submit" value="Sign Up" className="btn" />
          </form>

          <p>
            Already have an account?
            <Link href="/account/login"> Login</Link>{" "}
          </p>
        </div>
      ) : (
        <LoginAlready text="Register" />
      )}
    </Layout>
  );
};

export default RegisterPage;
