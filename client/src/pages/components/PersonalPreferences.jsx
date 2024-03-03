export default function PersonalPreferences({ userData, onUserDataChange }) {
  const [newPreference, setNewPreference] = useState("");

  const handleChange = (e) => {
    setNewPreference(e.target.value);
  };

  const handleAddPreference = () => {
    if (newPreference.trim() !== "") {
      onUserDataChange("preferences", [...userData.preferences, newPreference]);
      setNewPreference("");
    }
  };

  return (
    <div className="space-y-4">
      {/* Display existing preferences */}
      {userData.preferences.map((preference, index) => (
        <span
          key={index}
          className="bg-gray-200 py-1 px-3 rounded-full inline-block"
        >
          {preference}
        </span>
      ))}
      {/* Input field to add new preference */}
      <div className="flex items-center">
        <input
          type="text"
          value={newPreference}
          onChange={handleChange}
          placeholder="Add more..."
          className="border border-gray-300 rounded px-4 py-2 flex-grow mr-2"
        />
        {/* Button to add new preference */}
        <button
          onClick={handleAddPreference}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add More
        </button>
      </div>
    </div>
  );
}
