import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <h2>Img Tagger</h2>
      <ul className={styles.characters}>
        <li>
          Brian
          <img src="src/img/brian.jpg" alt="" />
        </li>
        <li>
          Wilson
          <img src="src/img/wilson.jpg" alt="" />
        </li>
        <li>
          Neo
          <img src="src/img/neo.jpg" alt="" />
        </li>
      </ul>
    </header>
  );
}

export default Header;
