import styles from "./Header.module.css";

function Header({ characters }) {
  const listItems = characters.map((char) => (
    <li>
      {" "}
      <span className={styles.charName}>{char.name}</span>
      <img src={char.imageUrl} alt={char.name} />
    </li>
  ));
  return (
    <header className={styles.header}>
      <h2>Img Tagger</h2>
      <ul className={styles.characters}>{listItems}</ul>
    </header>
  );
}

export default Header;
