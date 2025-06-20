import styles from "./App.module.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useRef, useState, useEffect } from "react";
import { MapPinCheck } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import brianImage from "./img/brian.jpg";
import wilsonImage from "./img/wilson.jpg";
import neoImage from "./img/neo.jpg";
import mainImage from "./img/placeholder.jpg";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuX, setMenuX] = useState(null);
  const [menuY, setMenuY] = useState(null);
  const [chosenX, setChosenX] = useState(null);
  const [chosenY, setChosenY] = useState(null);
  const [isMenuOnRight, setIsMenuOnRight] = useState(false);
  const [isMenuNearBottom, setIsMenuNearBottom] = useState(false);
  const [error, setError] = useState(false);
  const [wrongCoords, setWrongCoords] = useState(false);
  const imageRef = useRef(null);
  const [characters, setCharacters] = useState([
    {
      id: 1,
      name: "Brian",
      imageUrl: brianImage,
    },
    {
      id: 2,
      name: "Wilson",
      imageUrl: wilsonImage,
    },
    {
      id: 3,
      name: "Neo",
      imageUrl: neoImage,
    },
  ]);
  const [brianPin, setBrianPin] = useState(false);
  const [wilsonPin, setWilsonPin] = useState(false);
  const [neoPin, setNeoPin] = useState(false);
  const [correctChoice, setCorrectChoice] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(true);
  const [showStartModal, setShowStartModal] = useState(true);
  const [username, setUsername] = useState("");
  const [pending, setPending] = useState(false);
  const [timer, setTimer] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);

  function removeChar(charName) {
    setCharacters(characters.filter((ch) => ch.name !== charName));
  }

  const menuStyles = {
    ...(isMenuNearBottom
      ? { top: menuY - 83 * characters.length }
      : { top: menuY }),
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
    fetch("https://wheres-waldo-backend-h812.onrender.com/api/character", {
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
        if (json.result) {
          setError(false);
          setWrongCoords(false);
          setCorrectChoice(true);
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
          setTimeout(() => {
            setCorrectChoice(false);
          }, 3000);
        } else {
          setWrongCoords(true);
          setTimeout(() => {
            setWrongCoords(false);
          }, 8000);
        }
      })
      .catch(() => {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 10000);
      });
  }

  const listItems = characters.map((char) => (
    <li key={char.id}>
      <button onClick={() => handleCharacter(char.name)}>
        <img src={char.imageUrl} alt={char.name} />
        <span>{char.name}</span>
      </button>
    </li>
  ));

  function handleSubmit(e) {
    e.preventDefault();
    if (username.length < 3) {
      return;
    }
    setPending(true);
    fetch("https://wheres-waldo-backend-h812.onrender.com/api/leaderboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((res) => {
        localStorage.setItem("sessionId", res.id);
        setPending(false);
        setUsername("");
        setShowStartModal(false);
        setShowBackdrop(false);
        setTimer(res.startedAt);
      });
  }

  useEffect(() => {
    if (characters.length === 0) {
      setIsGameWon(true);
      fetch("https://wheres-waldo-backend-h812.onrender.com/api/leaderboard", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: localStorage.getItem("sessionId") }),
      })
        .then((response) => {
          if (response.status >= 400) {
            throw new Error("server error");
          }
          return response.json();
        })
        .then((res) => {
          console.log(res);
          setShowBackdrop(true);
          setShowFinishModal(true);
        });
    }
  }, [characters]);

  return (
    <>
      <AnimatePresence initial={false}>
        {correctChoice && (
          <motion.div
            className={styles.errorMessage}
            initial={{ opacity: 0, scale: 0, x: "-50%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, scale: 0, x: "-50%" }}
            key="correct choice message"
            style={{ backgroundColor: "#27d071" }}
          >
            Correct!
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence initial={false}>
        {wrongCoords && (
          <motion.div
            className={styles.errorMessage}
            initial={{ opacity: 0, scale: 0, x: "-50%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, scale: 0, x: "-50%" }}
            key="wrong coords message"
          >
            Wrong coordinates!
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence initial={false}>
        {error && (
          <motion.div
            className={styles.errorMessage}
            initial={{ opacity: 0, scale: 0, x: "-50%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, scale: 0, x: "-50%" }}
            key="server error message"
          >
            Server error!
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showBackdrop && (
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="backdrop"
          >
            {showStartModal && (
              <div className={styles.startModal}>
                <h2>
                  Your goal is to find the 3 characters shown in the header
                </h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                  <label htmlFor="content">
                    Username (at least 3 characters)
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {!pending && <button type="submit">Start</button>}
                  {pending && <button disabled>Pending...</button>}
                </form>
              </div>
            )}
            {showFinishModal && (
              <div className={styles.finishModal}>
                <h2>Congratulations, you finished the game.</h2>
                <Leaderboard></Leaderboard>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <div className={styles.wrapper}>
        <Header
          characters={characters}
          timer={timer}
          isGameWon={isGameWon}
        ></Header>
        <main className={styles.main} onClick={handleMenu}>
          <img
            src={mainImage}
            alt="Big isometric image depicting many characters"
            className={styles.mainImage}
            ref={imageRef}
          />
          {isOpen && (
            <ul className={styles.charList} style={menuStyles}>
              {listItems}
            </ul>
          )}
          {brianPin && <MapPinCheck className={styles.pin} style={brianPin} />}
          {wilsonPin && (
            <MapPinCheck className={styles.pin} style={wilsonPin} />
          )}
          {neoPin && <MapPinCheck className={styles.pin} style={neoPin} />}
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
