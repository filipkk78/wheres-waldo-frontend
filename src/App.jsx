import styles from "./App.module.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className={styles.wrapper}>
      <Header></Header>
      <main className={styles.main}></main>
      <Footer></Footer>
    </div>
  );
}

export default App;
