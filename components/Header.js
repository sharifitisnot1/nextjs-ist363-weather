import Container from "./Container";
import Row from "./Row";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <Container>
        <Row justifyContent="center" alignItems="center">
          <p>logo</p> <p>nav</p>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
