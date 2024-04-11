// Tabs.js
import classnames from "classnames/bind";

import styles from "./Tabs.module.scss"; // Fixed typo and file extension
const cx = classnames.bind(styles);

const Tabs = ({ activeIndex, clickHandler, items }) => {
  // Fixed typo in `activeIndex`
  return (
    <ul className={styles.tabs}>
      {items?.map((item, index) => {
        // Moved inside the map callback, before the return statement
        const itemClasses = cx({
          tabs__item: true,
          active: index === activeIndex, // Fixed typo in `activeIndex`
        });

        return (
          <li
            key={index}
            className={itemClasses} // Corrected variable name
            onClick={() => clickHandler(index)}
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
};

export default Tabs;
