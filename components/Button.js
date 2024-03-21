import styles from "./Button.module.scss";

const Button = ({ label }) => {
  return <button className={styles.btn}>{label}</button>;
};

export default Button;
