export default function ProfilePhoto({ userData, onUserDataChange }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="mt-4 flex-1 items-center">
        <img
          className="h-32 w-32 rounded-full object-cover"
          src={userData.avatar}
          alt="Profile"
        />
        {
          <div className="ml-4">
            <label
              htmlFor="photo"
              className="block text-sm font-medium text-gray-700"
            >
              Upload new photo
            </label>
            <input
              id="photo"
              name="photo"
              type="file"
              accept="image/*"
              className="mt-2"
              onChange={(e) => setPhoto(URL.createObjectURL(e.target.files[0]))}
            />
          </div>
        }
      </div>
    </div>
  );
}
