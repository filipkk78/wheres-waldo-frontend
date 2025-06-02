import styles from "./App.module.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuX, setMenuX] = useState(null);
  const [menuY, setMenuY] = useState(null);

  function toggleIsOpen() {
    if (isOpen) {
      setIsOpen(false);
    }
    if (!isOpen) {
      setIsOpen(true);
    }
  }

  function handleMenu(e) {
    console.log(e.pageX);
    setMenuX(e.pageX);
    setMenuY(e.pageY);
    toggleIsOpen();
  }

  return (
    <div className={styles.wrapper}>
      <Header></Header>
      <main className={styles.main}>
        <img src="src/img/placeholder.jpg" alt="" onClick={handleMenu} />
        {isOpen && (
          <div
            className={styles.menuWrapper}
            style={{ top: menuY - 50, left: menuX - 50 }}
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
