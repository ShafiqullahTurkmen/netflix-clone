import { useRouter } from "next/router";
import styles from "./navbar.module.css";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const Navbar = ({ username }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const router = useRouter();

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
            <p className={styles.username}>{username}</p>
            <Image src="/static/expand-more.svg" alt="dropdown icon" width="24" height="24"/>
          </button>
         { showDropDown && <div className={styles.navDropdown}>
            <div>
              <Link href="/login" className={styles.linkName}>Sign out</Link>
              <div className={styles.lineWrapper}></div>
            </div>
          </div>}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
