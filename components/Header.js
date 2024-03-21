const { headers } = require("next/headers");

import styles from "./Header.module.scss";

const Header = () => {
  return <header className={styles.header}>Logo and nav will go here.</header>;
};
export default Header;
