import styles from "./Button.module.scss";

const Button = ({ backgroundColor, label, clickhandler }) => {
  return (
    <button
      className={styles.btn}
      onClick={clickhandler}
      style={{ backgroundColor: backgroundColor }}
    >
      {label}
    </button>
  );
};

export default Button;
