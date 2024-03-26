import styles from "./Button.module.scss";

const Button = ({ label, clickhandler }) => {
  return (
    <button className={styles.btn} onClick={clickhandler}>
      {label}
    </button>
  );
};

export default Button;
