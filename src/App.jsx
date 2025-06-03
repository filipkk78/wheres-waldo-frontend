import styles from "./App.module.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useRef, useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuX, setMenuX] = useState(null);
  const [menuY, setMenuY] = useState(null);
  const [isMenuOnRight, setIsMenuOnRight] = useState(false);
  const [isMenuNearBottom, setIsMenuNearBottom] = useState(false);
  const imageRef = useRef(null);
  const charListRef = useRef(null);

  const menuStylesLeft = {
    ...(isMenuNearBottom ? { top: menuY - 250 } : { top: menuY }),
    left: menuX + 25,
  };

  const menuStylesRight = {
    ...(isMenuNearBottom ? { top: menuY - 250 } : { top: menuY }),
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
    const imageRect = e.target.getBoundingClientRect();
    setMenuX(e.pageX);
    setMenuY(e.pageY);
    toggleIsOpen();
    const pickedX =
      ((imageRect.left - e.clientX) / e.target.getBoundingClientRect().width) *
      -1;
    const pickedY =
      ((imageRect.top - e.clientY) / e.target.getBoundingClientRect().height) *
      -1;

    if (!isOpen) {
      console.log(`X: ${pickedX.toFixed(2)}, Y: ${pickedY.toFixed(2)}`);
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
            ref={charListRef}
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
