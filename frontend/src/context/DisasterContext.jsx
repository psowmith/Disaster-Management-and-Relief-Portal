import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import prop-types
import { fetchDisasterReports } from "../services/disasterService"; // Correct function name

// Create DisasterContext
export const DisasterContext = createContext();

// DisasterProvider component
export const DisasterProvider = ({ children }) => {
  const [disasters, setDisasters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDisasters = async () => {
      try {
        const data = await fetchDisasterReports(); // Use the correct function here
        setDisasters(data);
      } catch (error) {
        console.error("Error fetching disaster data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDisasters();
  }, []);

  return (
    <DisasterContext.Provider value={{ disasters, loading }}>
      {children}
    </DisasterContext.Provider>
  );
};

DisasterProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate children as a React node
};
