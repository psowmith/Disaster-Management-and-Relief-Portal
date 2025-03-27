import { useState, useEffect } from "react";
import { getVolunteerProfile } from "../../services/authService"; // Fetch volunteer profile
import { updateVolunteerDetails } from "../../services/volunteerService"; // Update volunteer details
const VolunteerProfilePage = () => {
  const [volunteer, setVolunteer] = useState(null); // Initialize as null until data is fetched
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state to handle async fetch

  useEffect(() => {
    const fetchVolunteerProfile = async () => {
      try {
        const data = await getVolunteerProfile(); // Fetch volunteer profile
        setVolunteer(data); // Set fetched data to state
        setIsLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching volunteer profile:", error);
        setIsLoading(false); // Set loading to false in case of error
      }
    };
    fetchVolunteerProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVolunteer({ ...volunteer, [name]: value }); // Update state with changes
  };

  const handleSave = async () => {
    try {
      await updateVolunteerDetails(volunteer); // Call API with updated volunteer data
      alert("Profile updated successfully!");
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing); // Toggle between view and edit modes
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-xl text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center text-white"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/3480494/pexels-photo-3480494.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
      }}
    >
      <div className="container mx-auto max-w-3xl p-8 rounded-lg shadow-lg bg-black bg-opacity-75">
        <h2 className="text-5xl font-bold mb-6 text-center">Volunteer Profile</h2>

        {!isEditing && volunteer && (
          <div className="space-y-4">
            <p className="text-lg">
              <strong className="font-semibold">Full Name:</strong> {volunteer.name}
            </p>
            <p className="text-lg">
              <strong className="font-semibold">Email:</strong> {volunteer.email}
            </p>
            <p className="text-lg">
              <strong className="font-semibold">Skills:</strong>{" "}
              {volunteer.skills ? volunteer.skills.join(", ") : "N/A"}
            </p>
            <p className="text-lg">
              <strong className="font-semibold">Assigned Disaster:</strong>{" "}
              {volunteer.assignedDisaster || "None"}
            </p>

            <button
              onClick={toggleEditing}
              className="mt-4 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-lg text-xl transition-transform transform hover:scale-105"
            >
              Edit Profile
            </button>
          </div>
        )}

        {isEditing && volunteer && (
          <div className="space-y-4">
            <div>
              <label className="block text-lg font-semibold">Full Name</label>
              <input
                type="text"
                name="name"
                value={volunteer.name}
                onChange={handleChange}
                className="w-full p-3 mt-2 text-black rounded-lg border border-gray-300 focus:border-green-400 focus:ring focus:ring-green-200"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold">Email</label>
              <input
                type="email"
                name="email"
                value={volunteer.email}
                onChange={handleChange}
                className="w-full p-3 mt-2 text-black rounded-lg border border-gray-300 focus:border-green-400 focus:ring focus:ring-green-200"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold">Skills</label>
              <input
                type="text"
                name="skills"
                value={volunteer.skills ? volunteer.skills.join(", ") : ""}
                onChange={(e) =>
                  handleChange({
                    target: {
                      name: "skills",
                      value: e.target.value.split(",").map((skill) => skill.trim()),
                    },
                  })
                }
                className="w-full p-3 mt-2 text-black rounded-lg border border-gray-300 focus:border-green-400 focus:ring focus:ring-green-200"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold">Assigned Disaster</label>
              <input
                type="text"
                name="assignedDisaster"
                value={volunteer.assignedDisaster || ""}
                onChange={handleChange}
                className="w-full p-3 mt-2 text-black rounded-lg border border-gray-300 focus:border-green-400 focus:ring focus:ring-green-200"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold">Password</label>
              <input
                type="password"
                name="password"
                value={volunteer.password || ""}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full p-3 mt-2 text-black rounded-lg border border-gray-300 focus:border-green-400 focus:ring focus:ring-green-200"
              />
            </div>

            <button
              onClick={handleSave}
              className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg text-xl transition-transform transform hover:scale-105"
            >
              Save Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VolunteerProfilePage;
