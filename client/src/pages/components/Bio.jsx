export default function Bio({ userData, onUserDataChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onUserDataChange(name, value);
  };

  return (
    <div>
      <textarea
        name="bio"
        value={userData.bio}
        onChange={handleChange}
        placeholder="Write something about yourself..."
        className="border border-gray-300 rounded px-4 py-2 w-full h-24 resize-none"
      />
    </div>
  );
}
