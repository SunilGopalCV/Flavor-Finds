import { useState } from "react";

export default function SocialMediaAccounts({ userData, onUserDataChange }) {
  const [newAccount, setNewAccount] = useState({ platform: "", link: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAccount((prevAccount) => ({
      ...prevAccount,
      [name]: value,
    }));
  };

  const handleAddAccount = () => {
    if (newAccount.platform.trim() !== "" && newAccount.link.trim() !== "") {
      onUserDataChange("socialMedia", [...userData.socialMedia, newAccount]);
      setNewAccount({ platform: "", link: "" });
    }
  };

  return (
    <div className="space-y-4">
      {/* Display existing social media accounts */}
      {userData.socialMedia.map((account, index) => (
        <div key={index}>
          <input
            type="text"
            name={`platform-${index}`}
            value={account.platform}
            onChange={(e) => handleChange(e, index)}
            placeholder="Platform"
            className="border border-gray-300 rounded px-4 py-2 mr-2"
          />
          <input
            type="text"
            name={`link-${index}`}
            value={account.link}
            onChange={(e) => handleChange(e, index)}
            placeholder="Link"
            className="border border-gray-300 rounded px-4 py-2 mr-2"
          />
        </div>
      ))}
      {/* Input fields to add new social media account */}
      <div className="flex items-center">
        <input
          type="text"
          name="platform"
          value={newAccount.platform}
          onChange={handleChange}
          placeholder="Platform"
          className="border border-gray-300 rounded px-4 py-2 flex-grow mr-2"
        />
        <input
          type="text"
          name="link"
          value={newAccount.link}
          onChange={handleChange}
          placeholder="Link"
          className="border border-gray-300 rounded px-4 py-2 flex-grow mr-2"
        />
        {/* Button to add new social media account */}
        <button
          onClick={handleAddAccount}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add More
        </button>
      </div>
    </div>
  );
}
