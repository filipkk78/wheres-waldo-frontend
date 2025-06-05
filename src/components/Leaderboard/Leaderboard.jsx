import { useEffect, useState } from "react";
import styles from "./Leaderboard.module.css";
import Loading from "../Loading/Loading";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("http://localhost:5000/api/leaderboard", {
      mode: "cors",
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((json) => {
        setLeaderboard(json.leaderboard);
        setLoading(false);
      })
      .catch((error) => setError(error));
  }, []);
  if (loading) return <Loading></Loading>;
  if (error) {
    return (
      <div>
        <h1>Server error</h1>
      </div>
    );
  }
  return (
    <>
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, i) => (
            <tr key={entry.id} className={styles.entry}>
              <td data-cell="Rank">{i + 1}</td>
              <td data-cell="Name">{entry.username}</td>
              <td data-cell="Time">{entry.completionInterval}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Leaderboard;
