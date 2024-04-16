import styles from "./Container.module.scss";

const Conatiner = ({ children }) => {
  return <div className={styles.conatiner}>{children}</div>;
};
export default Conatiner;
