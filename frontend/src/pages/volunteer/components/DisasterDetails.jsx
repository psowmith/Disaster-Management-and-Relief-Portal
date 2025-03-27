import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchDisasterReportById, updateDisasterReport } from "../../../services/disasterService";
import { updateUserNotification } from "../../../services/authService";

const DisasterDetails = () => {
  const { id } = useParams(); // Get the disaster id from the URL
  const [disaster, setDisaster] = useState(null);
  const [resource, setResource] = useState({
    name: "",
    quantity: 0,
    type: "other",
  }); // State to store resource details
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track submission status
  const [error, setError] = useState(""); // State to handle errors

  useEffect(() => {
    const fetchDisasterDetails = async () => {
      try {
        const disasterDetails = await fetchDisasterReportById(id); // Fetch disaster details by ID
        setDisaster(disasterDetails);
      } catch (error) {
        console.error("Error fetching disaster details:", error);
        setDisaster(null);
      }
    };

    fetchDisasterDetails();
  }, [id]);

  const handleResourceChange = (e) => {
    const { name, value } = e.target;
    setResource({
      ...resource,
      [name]: name === "quantity" ? parseInt(value, 10) || 0 : value,
    }); // Update resource details
  };

  const handleResourceSubmit = async () => {
    if (resource.name.trim() && resource.quantity > 0) {
      const notificationMessage = `
        A resource donation has been made for the disaster "${disaster?.title}".
        Details:
        - Resource Name: ${resource.name}
        - Quantity: ${resource.quantity}
        - Type: ${resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
      `;

      try {
        // Send notification to the disaster reporter
        await updateUserNotification(disaster?.email, notificationMessage);

        // Update disaster report status to "in-progress"
        await updateDisasterReport(id,"in-progress");

        // Show success message
        setIsSubmitted(true);
        console.log("Resource Submitted:", resource);

        // Reset the resource form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false); // Reset the success message after 3 seconds
          setResource({ name: "", quantity: 0, type: "other" }); // Reset form fields
        }, 3000);
        
      } catch (error) {
        console.error("Error sending notification or updating disaster:", error);
        setError("Failed to send notification or update disaster. Please try again.");
      }
    } else {
      alert("Please fill in all fields with valid data.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F2143] via-[#43572E] to-[#354E56]">
      {disaster ? (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Section: Image */}
          <div className="w-full flex justify-center">
            <img
              src={disaster.image || "/default-image.jpg"}
              alt={disaster.title}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          {/* Right Section: Details */}
          <div className="w-full">
            <h2 className="text-3xl font-semibold mb-4">{disaster.title}</h2>
            <p className="text-lg mb-4">{disaster.description}</p>
            <p className="text-md mb-2">
              <strong>Location:</strong> {disaster.location}
            </p>
            <p className="text-md mb-4">
              <strong>Status:</strong> {disaster.status}
            </p>
            <p className="text-md mb-6">
              <strong>Reported By:</strong> {disaster.Username} ({disaster.email})
            </p>

            {/* Resource Donation Form */}
            <div className="mb-6">
              <label htmlFor="name" className="block text-lg font-medium mb-2">
                Resource Name
              </label>
              <input
                id="name"
                name="name"
                value={resource.name}
                onChange={handleResourceChange}
                className="w-full p-3 border border-gray-300 rounded-lg bg-transparent text-gray-800"
                placeholder="Enter resource name (e.g., Medicines)"
              />

              <label htmlFor="quantity" className="block text-lg font-medium mt-4 mb-2">
                Quantity
              </label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                value={resource.quantity}
                onChange={handleResourceChange}
                className="w-full p-3 border border-gray-300 rounded-lg bg-transparent text-gray-800"
                placeholder="Enter quantity"
              />

              <label htmlFor="type" className="block text-lg font-medium mt-4 mb-2">
                Resource Type
              </label>
              <select
                id="type"
                name="type"
                value={resource.type}
                onChange={handleResourceChange}
                className="w-full p-3 border border-gray-300 rounded-lg bg-transparent text-gray-800"
              >
                <option value="medical">Medical</option>
                <option value="food">Food</option>
                <option value="shelter">Shelter</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button
              onClick={handleResourceSubmit}
              className="w-full bg-gradient-to-r from-[#8B6212] to-[#43572E] text-white py-2 rounded-lg hover:bg-[#3B373B] transition"
            >
              Submit Resource
            </button>

            {isSubmitted && (
              <div className="mt-4 p-3 bg-green-500 text-white rounded-md">
                Resource Information Submitted Successfully!
              </div>
            )}

            {error && (
              <div className="mt-4 p-3 bg-red-500 text-white rounded-md">
                {error}
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className="text-lg text-red-500">Disaster details not found!</p>
      )}
    </div>
  );
};

export default DisasterDetails;
