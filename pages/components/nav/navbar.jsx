import { useRouter } from "next/router";
import styles from "./navbar.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { magic } from "@/lib/magic-client";

const Navbar = () =>  {
  const [showDropDown, setShowDropDown] = useState(false);
  const [userName, setUserName] = useState("");
  const router = useRouter();
  
  useEffect(() => {
    async function getUsername() {
      try {
        const { email } = await magic.user.getInfo();
        if (email) {
          setUserName(email);
        }
      } catch (error) {
        console.log("Error retrieving email:", error);
      }
    }
    getUsername();
  }, []);

  const handleOnClickHome = (e) => {
    e.preventDefault();
    router.push("/");
  };
  const handleOnClickList = (e) => {
    e.preventDefault();
    router.push("/browse/my-list");
  };

  const handleShowDropDown = (e) => {
    e.preventDefault();
    setShowDropDown(!showDropDown);
  }

  const handleSignOut = async (e) => {
    try {
      e.preventDefault();
      await magic.user.logout();
      router.push("/login")
    } catch (error) {
      console.log(error.message);
      console.error(error);
      router.push("/login")
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href="/" className={styles.logoLink}>
          <div className={styles.logoWrapper}>
          <Image src="/static/netflix.svg" alt="netflix" width="128" height="34"/>
          
          </div>
        </Link>

        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>
            Home
          </li>
          <li className={styles.navItem2} onClick={handleOnClickList}>
            My List
          </li>
        </ul>

        <nav className={styles.navContainer}>
          <button className={styles.usernameBtn} onClick={handleShowDropDown}>
            <p className={styles.username}>{userName}</p>
            <Image src="/static/expand-more.svg" alt="dropdown icon" width="24" height="24"/>
          </button>
         { showDropDown && <div className={styles.navDropdown}>
            <div>
              <button onClick={handleSignOut} className={styles.linkName}>Sign out</button>
              <div className={styles.lineWrapper}></div>
            </div>
          </div>}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
