import React, { useState } from 'react';
import mockAPI from './api/mockapi';
import Table from './components/Table';
import AreaForecast from './components/AreaForecast';
import styles from './components/Button.module.css';

function App() {
  // State variables to manage forecasts, area-specific forecasts, loading state, and error messages.
  const [forecasts, setForecasts] = useState([]);
  const [areaForecast, setAreaForecast] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to fetch all weather forecasts
  const apiGetAll = async () => {
    setLoading(true);
    setError(""); // Reset any previous error messages
    try {
      const response = await mockAPI.get('/two-hr-forecast');
      console.log("API response:", response.data); // Log the entire response
  
      // Check if the response contains data and items
      if (response.status === 200 && response.data.data && response.data.data.items) {
        const items = response.data.data.items;
        if (items.length > 0 && items[0].forecasts) {
          setForecasts(items[0].forecasts);
        } else {
          setError("No forecasts available or unexpected data structure.");
          console.error("Unexpected data structure:", response.data);
        }
      } else {
        setError("No data available or unexpected response structure.");
        console.error("Unexpected response structure:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error); // Log the error
      setError("Failed to fetch data. Please try again later."); // Set error message for request failure
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  // Function to fetch forecast for a specific area
  const apiGet = async (area) => {
    setLoading(true); // Set loading state to true
    setError(""); // Reset any previous error messages
    try {
      const response = await mockAPI.get('/two-hr-forecast');
      if (response.status === 200 && response.data.data && response.data.data.items.length > 0) {
        const forecast = response.data.data.items[0].forecasts.find(
          (item) => item.area.toLowerCase() === area.toLowerCase()
        );
        if (forecast) {
          setAreaForecast(`The forecast in ${area} is ${forecast.forecast}`);
        } else {
          setAreaForecast(`No forecast found for ${area}.`);
        }
      } else {
        setError("No data available or unexpected response structure.");
        console.error("Unexpected response structure:", response.data);
      }
    } catch (error) {
      console.error("Error fetching forecast for area:", error);
      setAreaForecast("Failed to fetch forecast. Please try again later.");
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <div className="App">
      {/* Component to handle area-specific forecast */}
      <AreaForecast getForecast={apiGet} areaForecast={areaForecast} />
      {/* Button to load all weather forecasts */}
      <button className={styles.button} onClick={apiGetAll}>
        Load all weather forecasts
      </button>
      {/* Display loading message if loading */}
      {loading && <p>Loading...</p>}
      {/* Display error message if an error occurred */}
      {error && <p>{error}</p>}
      {/* Display forecasts data in a table */}
      <Table list={forecasts} />
    </div>
  );
}

export default App;