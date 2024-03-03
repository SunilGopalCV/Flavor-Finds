export default function PersonalInfo({ userData, onUserDataChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onUserDataChange(name, value);
  };

  return (
    <div className="space-y-4">
      {/* Input fields for personal information */}
      <input
        type="text"
        name="fullName"
        value={userData.fullName}
        onChange={handleChange}
        placeholder="Full Name"
        className="border border-gray-300 rounded px-4 py-2"
      />
      <input
        type="email"
        name="emailAddress"
        value={userData.emailAddress}
        onChange={handleChange}
        placeholder="Email Address"
        className="border border-gray-300 rounded px-4 py-2"
      />
      <input
        type="text"
        name="mobileNumber"
        value={userData.mobileNumber}
        onChange={handleChange}
        placeholder="Mobile Number"
        className="border border-gray-300 rounded px-4 py-2"
      />
      <input
        type="text"
        name="nickname"
        value={userData.nickname}
        onChange={handleChange}
        placeholder="Nickname"
        className="border border-gray-300 rounded px-4 py-2"
      />
    </div>
  );
}
