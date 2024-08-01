import { useState } from "react";
import styles from "./Button.module.css";

export default function AreaForecast({ areaForecast, getForecast }) {
  const [inputArea, setInputArea] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (inputArea.trim() === "") {
      alert("Please input an area");
      return;
    }
    console.log("Getting forecast for area:", inputArea); // Debugging
    getForecast(inputArea);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Get weather forecast for an area</h1>
        <span>Area: </span>
        <input
          name="area"
          type="text"
          value={inputArea}
          onChange={(e) => setInputArea(e.target.value)}
        />
        <br />
        <button className={styles.button}>Get forecast</button>
      </form>
      {areaForecast && (
        <h2 style={{ marginTop: "5px" }}>{areaForecast}</h2>
      )}
    </div>
  );
}