import styles from "./App.module.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useRef, useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuX, setMenuX] = useState(null);
  const [menuY, setMenuY] = useState(null);
  const [isMenuOnRight, setIsMenuOnRight] = useState(false);
  const imageRef = useRef(null);

  const menuStylesLeft = {
    top: menuY,
    left: menuX + 25,
  };

  const menuStylesRight = {
    top: menuY,
    left: menuX - 175,
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
    setMenuX(e.pageX);
    setMenuY(e.pageY);
    toggleIsOpen();
    if (!isOpen) {
      console.log(
        `X: ${(e.pageX / imageRef.current.clientWidth).toFixed(2)}, Y: ${(
          e.pageY / imageRef.current.clientHeight
        ).toFixed(2)}`
      );
    }
    const menuLocation = e.pageX / imageRef.current.clientWidth;
    if (menuLocation > 0.7) {
      setIsMenuOnRight(true);
    } else {
      setIsMenuOnRight(false);
    }
  }

  return (
    <div className={styles.wrapper}>
      <Header></Header>
      <main className={styles.main} onClick={handleMenu}>
        <img
          src="src/img/placeholder.jpg"
          alt=""
          onClick={handleMenu}
          className={styles.mainImage}
          ref={imageRef}
        />
        {isOpen && (
          <ul
            className={styles.charList}
            style={!isMenuOnRight ? menuStylesLeft : menuStylesRight}
          >
            <li>
              <img src="src/img/brian.jpg" alt="" />
              <span>Brian</span>
            </li>
            <li>
              <img src="src/img/wilson.jpg" alt="" />
              <span>Wilson</span>
            </li>
            <li>
              <img src="src/img/neo.jpg" alt="" />
              <span>Neo</span>
            </li>
          </ul>
        )}
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
