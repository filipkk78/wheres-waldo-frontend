import styles from "./App.module.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useRef, useState } from "react";
import { MapPinCheck } from "lucide-react";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuX, setMenuX] = useState(null);
  const [menuY, setMenuY] = useState(null);
  const [chosenX, setChosenX] = useState(null);
  const [chosenY, setChosenY] = useState(null);
  const [isMenuOnRight, setIsMenuOnRight] = useState(false);
  const [isMenuNearBottom, setIsMenuNearBottom] = useState(false);
  const imageRef = useRef(null);
  const [characters, setCharacters] = useState([
    {
      id: 1,
      name: "Brian",
      imageUrl: "src/img/brian.jpg",
    },
    {
      id: 2,
      name: "Wilson",
      imageUrl: "src/img/wilson.jpg",
    },
    {
      id: 3,
      name: "Neo",
      imageUrl: "src/img/neo.jpg",
    },
  ]);
  const [brianPin, setBrianPin] = useState(false);
  const [wilsonPin, setWilsonPin] = useState(false);
  const [neoPin, setNeoPin] = useState(false);

  function removeChar(charName) {
    setCharacters(characters.filter((ch) => ch.name !== charName));
  }

  const menuStyles = {
    ...(isMenuNearBottom ? { top: menuY - 250 } : { top: menuY }),
    ...(!isMenuOnRight ? { left: menuX + 25 } : { left: menuX - 175 }),
  };

  function toggleIsOpen() {
    if (isOpen) {
      setIsOpen(false);
    }
    if (!isOpen) {
      setIsOpen(true);
    }
  }

  function handleMenu(e) {
    const imageRect = e.target.getBoundingClientRect();
    setMenuX(e.pageX);
    setMenuY(e.pageY);
    toggleIsOpen();
    const pickedX = Math.floor(
      ((imageRect.left - e.clientX) / e.target.getBoundingClientRect().width) *
        -1 *
        100
    );
    const pickedY = Math.floor(
      ((imageRect.top - e.clientY) / e.target.getBoundingClientRect().height) *
        -1 *
        100
    );

    if (!isOpen) {
      setChosenX(pickedX);
      setChosenY(pickedY);
      console.log(`X: ${pickedX}, Y: ${pickedY}`);
    }
    const menuLocationX = e.pageX / imageRef.current.clientWidth;
    if (menuLocationX > 0.5) {
      setIsMenuOnRight(true);
    } else {
      setIsMenuOnRight(false);
    }
    const menuLocationY = e.pageY / imageRef.current.clientHeight;

    if (menuLocationY > 0.9) {
      setIsMenuNearBottom(true);
    } else {
      setIsMenuNearBottom(false);
    }
  }

  function handleCharacter(charName) {
    fetch("http://localhost:5000/api/character", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify({
        characterName: charName,
        coordsX: chosenX,
        coordsY: chosenY,
      }),
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((json) => {
        console.log(json.result);
        if (json.result) {
          removeChar(charName);
          const rem = parseFloat(
            getComputedStyle(document.documentElement).fontSize
          );
          const pinStyles = {
            left: menuX - 1.5 * rem,
            top: menuY - 3 * rem,
          };

          if (charName == "Wilson") {
            setWilsonPin(pinStyles);
          }
          if (charName == "Brian") {
            setBrianPin(pinStyles);
          }
          if (charName == "Neo") {
            setNeoPin(pinStyles);
          }
        }
      })
      .catch((error) => console.log(error));
  }

  const listItems = characters.map((char) => (
    <li key={char.id}>
      <button onClick={() => handleCharacter(char.name)}>
        <img src={char.imageUrl} alt={char.name} />
        <span>{char.name}</span>
      </button>
    </li>
  ));

  return (
    <div className={styles.wrapper}>
      <Header characters={characters}></Header>
      <main className={styles.main} onClick={handleMenu}>
        <img
          src="src/img/placeholder.jpg"
          alt=""
          onClick={handleMenu}
          className={styles.mainImage}
          ref={imageRef}
        />
        {isOpen && (
          <ul className={styles.charList} style={menuStyles}>
            {listItems}
          </ul>
        )}
        {brianPin && <MapPinCheck className={styles.pin} style={brianPin} />}
        {wilsonPin && <MapPinCheck className={styles.pin} style={wilsonPin} />}
        {neoPin && <MapPinCheck className={styles.pin} style={neoPin} />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
