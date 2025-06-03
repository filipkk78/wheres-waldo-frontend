import styles from "./App.module.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useRef, useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuX, setMenuX] = useState(null);
  const [menuY, setMenuY] = useState(null);
  const imageRef = useRef(null);

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
            className={styles.menuCircle}
            style={{ top: menuY - 25, left: menuX - 25 }}
          >
            {" "}
          </div>
        )}
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
