import { useEffect, useState } from "react";
import styles from "./Header.module.css";

function formatSeconds(seconds) {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const leftoverSeconds = Math.round(seconds % 60)
    .toString()
    .padStart(2, "0");
  const completionMinutes = `${mins}:${leftoverSeconds}`;
  return completionMinutes;
}

function Header({ characters, timer, isGameWon }) {
  const [time, setTime] = useState(0);
  useEffect(() => {
    let myInterval;
    if (timer && !isGameWon) {
      myInterval = setInterval(() => {
        setTime(time + 1);
      }, 1000);
      return () => clearInterval(myInterval);
    }
  });

  const listItems = characters.map((char) => (
    <li key={char.id}>
      <span className={styles.charName}>{char.name}</span>
      <img src={char.imageUrl} alt={char.name} />
    </li>
  ));
  return (
    <header className={styles.header}>
      {!timer && <h2>Img Tagger</h2>}
      {timer && <h2>{formatSeconds(time)}</h2>}
      <ul className={styles.characters}>{listItems}</ul>
    </header>
  );
}

export default Header;
