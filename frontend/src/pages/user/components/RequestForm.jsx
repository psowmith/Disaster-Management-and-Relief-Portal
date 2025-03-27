import { useState, useEffect } from "react";
import GoogleDrivePicker from "google-drive-picker";
import { submitDisasterReport } from "../../../services/disasterService";

const RequestForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    email: "",
    username: "",
    image: null,
    imageUrl: null,
  });

  const [authToken, setAuthToken] = useState("");
  const [openPicker, authRes] = GoogleDrivePicker();
  const [errors, setErrors] = useState({}); // State for validation errors

  const handlePickerOpen = () => {
    openPicker({
      clientId: "399445094631-cp3gj2ihnte0oder6gug9ufijhu3682h.apps.googleusercontent.com",
      developerKey: "AIzaSyBdCqbokyV7Z5gxGFSEKQ1SrTkcREAGySo",
      viewId: "DOCS",
      token: authToken,
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: false,
      callbackFunction: (data) => {
        if (data.action === "cancel") {
          console.log("User clicked cancel/close button");
        } else if (data.docs && data.docs.length > 0) {
          const file = data.docs[0];
          const fileId = file.id;
          const imageUrl = `https://drive.google.com/thumbnail?id=${fileId}&sz=s4000`;
          console.log(imageUrl);
          setFormData({ ...formData, image: file, imageUrl });
        }
      },
    });
  };

  useEffect(() => {
    if (authRes) {
      setAuthToken(authRes.access_token);
    }
  }, [authRes]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Type of assistance is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email address";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.imageUrl) newErrors.image = "Image upload is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop form submission if validation fails
    }

    const payload = {
      title: formData.title,
      description: formData.description,
      location: formData.location,
      email: formData.email,
      Username: formData.username,
      image: formData.imageUrl, // Only send imageUrl
    };

    try {
      //console.log(payload);
      const data = await submitDisasterReport(payload);
      alert("Request submitted successfully");
      console.log(data);
    } catch (err) {
      console.error("Error occurred during form submit 🥵😒", err);
    }
  };

  return (
    <form className="p-6 rounded-md shadow-md" onSubmit={handleSubmit}>
      <label className="block mb-2 font-medium">Type of Assistance</label>
      <select
        className={`w-full border p-2 rounded-md mb-2 ${
          errors.title ? "border-red-500" : ""
        }`}
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      >
        <option value="">Select Type</option>
        <option value="Medical">Medical Assistance</option>
        <option value="Shelter">Shelter</option>
        <option value="Food">Food</option>
        <option value="Rescue">Rescue</option>
      </select>
      {errors.title && <p className="text-red-500 text-sm mb-4">{errors.title}</p>}

      <label className="block mb-2 font-medium">Username</label>
      <input
        className={`w-full border p-2 rounded-md mb-2 ${
          errors.username ? "border-red-500" : ""
        }`}
        type="text"
        placeholder="Enter your username"
        value={formData.username}
        onChange={(e) =>
          setFormData({ ...formData, username: e.target.value })
        }
      />
      {errors.username && (
        <p className="text-red-500 text-sm mb-4">{errors.username}</p>
      )}

      <label className="block mb-2 font-medium">Email</label>
      <input
        className={`w-full border p-2 rounded-md mb-2 ${
          errors.email ? "border-red-500" : ""
        }`}
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={(e) =>
          setFormData({ ...formData, email: e.target.value })
        }
      />
      {errors.email && <p className="text-red-500 text-sm mb-4">{errors.email}</p>}

      <label className="block mb-2 font-medium">Description</label>
      <textarea
        className={`w-full border p-2 rounded-md mb-2 ${
          errors.description ? "border-red-500" : ""
        }`}
        rows="4"
        placeholder="Describe your situation"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      ></textarea>
      {errors.description && (
        <p className="text-red-500 text-sm mb-4">{errors.description}</p>
      )}

      <label className="block mb-2 font-medium">Location</label>
      <input
        className={`w-full border p-2 rounded-md mb-2 ${
          errors.location ? "border-red-500" : ""
        }`}
        type="text"
        placeholder="Enter your location"
        value={formData.location}
        onChange={(e) =>
          setFormData({ ...formData, location: e.target.value })
        }
      />
      {errors.location && (
        <p className="text-red-500 text-sm mb-4">{errors.location}</p>
      )}

      <label className="block mb-2 font-medium">Upload Image</label>
      <button
        type="button"
        onClick={handlePickerOpen}
        className={`w-full border p-2 rounded-md mb-2 ${
          errors.image ? "border-red-500" : ""
        }`}
      >
        Select Image from Google Drive
      </button>
      {errors.image && <p className="text-red-500 text-sm mb-4">{errors.image}</p>}

      {formData.imageUrl ? (
  <div className="mb-4">
    <p className="text-sm">Preview:</p>
    <img
      src={formData.imageUrl}
      alt="Uploaded preview"
      className="w-full h-auto max-h-64 object-cover mt-2 rounded-md shadow-md"
      onError={() => console.error("Image failed to load:", formData.imageUrl)}
    />
  </div>
) : (
  <p className="text-red-500 text-sm">No image selected or invalid URL.</p>
)}


      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md"
      >
        Submit Request
      </button>
    </form>
  );
};

export default RequestForm;
