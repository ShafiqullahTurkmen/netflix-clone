import Head from "next/head";
import styles from "./index.module.css";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const Login = () => {

  const [email, setEmail] = useState("");
  const [userMsg, setUserMsg] = useState("");
  const handleOnChangeEmail = (e) => {
    setUserMsg("");
    console.log("event", e);
    const email = e.target.value;
    setEmail(email);
  };

  const handleLoginWithEmail = (e) => {
    e.preventDefault();
    console.log("it worksssssssssssss");

    if (email) {
      // route to dashboard
    } else {
      // show user message
      setUserMsg("Enter a valid email address");
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix SignIn</title>
      </Head>

      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Link href="/" className={styles.logoLink}>
            <div className={styles.logoWrapper}>
              <Image
                src="/static/netflix.svg"
                alt="Netflix Login Image"
                width="128"
                height="34"
              />
            </div>
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>

          <input
            type="text"
            placeholder="Email address"
            className={styles.emailInput}
            onChange={handleOnChangeEmail}
          />

          <p className={styles.userMsg}>{userMsg}</p>
          <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
            Sign In
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
