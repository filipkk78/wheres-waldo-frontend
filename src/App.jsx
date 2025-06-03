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
    top: menuY - 25,
    left: menuX - 25,
  };

  const menuStylesRight = {
    top: menuY - 25,
    left: menuX - 115,
    flexDirection: "row-reverse",
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
    console.log(menuLocation);
    if (menuLocation > 0.7) {
      console.log(true);
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
          <div
            className={styles.charMenu}
            style={!isMenuOnRight ? menuStylesLeft : menuStylesRight}
          >
            <div className={styles.menuCircle}></div>
            <ul className={styles.charList}>
              <li>Brian</li>
              <li>Wilson</li>
              <li>Neo</li>
            </ul>
          </div>
        )}
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
