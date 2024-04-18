import classnames from "classnames/bind";
import styles from "./Row.modules.scss";

const cx = classnames.bind(styles);

const Row = ({ alignItems, children, justifyContent }) => {
  const rowClasses = cx({
    row: true,
    [`align-items-${alignItems}`]: alignItems,
    [`justify-content-${justifyContent}`]: justifyContent,
  });

  return <div className={rowClasses}>{children}</div>;
};
export default Row;
