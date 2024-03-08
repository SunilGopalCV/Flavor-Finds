import {
  LayoutDashboard,
  CircleUserRound,
  Star,
  Soup,
  ShoppingBasket,
  LogOut,
  FilePenLine,
} from "lucide-react";
import Sidebar, { SidebarItem } from "./components/Sidebar";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Fire base Storage
// allow read;
// allow write: if
// request.resource.size < 2 * 1024*1024 &&
// request.resource.contentType.matches('image/.*')

export default function Profile() {
  const fileRef = useRef(null);
  const [formData, setFormData] = useState({});
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [editProfile, setEditProfile] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  const navItems = [
    { name: "Profile", path: "/profile", logo: <CircleUserRound size={20} /> },
    {
      name: "Dashboard",
      path: "/dashboard",
      logo: <LayoutDashboard size={20} />,
    },
    { name: "Favorites", path: "/favorites", logo: <Star size={20} /> },
    { name: "MealPlan", path: "/meal-planning", logo: <Soup size={20} /> },
    {
      name: "ShopList",
      path: "/shopping-list",
      logo: <ShoppingBasket size={20} />,
    },
    { name: "Logout", path: "/api/auth/logout", logo: <LogOut size={20} /> },
  ];
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success == false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      setEditProfile(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  return (
    <div className="flex h-full overflow-hidden">
      <div className="flex sticky shadow-form">
        <Sidebar>
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              className="block px-3 py-2 rounded-md text-base font-medium no-underline font-proxima-nova"
            >
              <SidebarItem
                icon={item.logo}
                text={item.name}
                active={location.pathname === item.path}
              />
            </a>
          ))}
        </Sidebar>
      </div>
      <form
        className="container mx-auto pl-[4rem] bg-[#f6fff9] pr-[2rem] w-full overflow-y-scroll"
        style={{ maxHeight: "calc(100vh - 6rem)" }}
        onSubmit={handleSubmit}
      >
        <div className="flex max-w-full items-center space-x-10 justify-between py-[0.5rem]">
          <div className="flex items-baseline space-x-6">
            <h1 className="font-bold text-[2rem]">User Profile</h1>
            <p
              className="mt-6 text-gray-500 items-baseline cursor-pointer"
              onClick={() => setEditProfile(false)}
            >
              Edit Profile <FilePenLine size={18} />
            </p>
          </div>
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
          />
          <button
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300"
            type="submit"
            disabled={loading}
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
              {loading ? "Loading..." : "Save Changes"}
            </span>
          </button>
        </div>
        <p className="text-red-700 mx-4">{error ? error : " "}</p>
        <p className="text-green-700 mx-4">
          {updateSuccess ? "User is updated Successfully" : ""}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left column */}
          <div className="space-y-8">
            <div className="shadow-form p-5 rounded-xl w-[22rem] bg-white">
              <img
                src={formData.avatar || currentUser.avatar}
                alt="profile"
                className="rounded-full border border-solid border-green-900 w-[4rem] h-[4rem]"
              />
              <h2 className="text-primary">Your Photo</h2>
              <p className="font-proxima-nova text-primary">
                This will be displayed on your Profile
              </p>
              <button
                disabled={editProfile}
                onClick={() => fileRef.current.click()}
                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                  Upload New
                </span>
              </button>
              <p className="font-proxima-nova">
                {fileUploadError ? (
                  <span className="text-red-700">Error Image Upload</span>
                ) : filePerc > 0 && filePerc < 100 ? (
                  <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
                ) : filePerc === 100 ? (
                  <span className="text-green-700">
                    Image uploaded successfully!
                  </span>
                ) : (
                  ""
                )}
              </p>
            </div>
            <div className="flex flex-col shadow-form p-5 rounded-xl w-[22rem] font-proxima-nova bg-white">
              <h2 className="text-primary ">Personal Information</h2>
              <label htmlFor="username">Full name</label>
              <input
                disabled={editProfile}
                className="w-full py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none font-overlock"
                type="text"
                id="username"
                defaultValue={currentUser.username}
                onChange={handleChange}
              />
              <label htmlFor="email">Email address</label>
              <input
                disabled={editProfile}
                className="w-full py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none font-overlock"
                type="text"
                id="email"
                defaultValue={currentUser.email}
                onChange={handleChange}
              />
              <label htmlFor="phone">Mobile Number</label>
              <input
                disabled={editProfile}
                className="w-full py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none font-overlock"
                type="number"
                id="phone"
                defaultValue={currentUser.phone}
                placeholder="Enter your number:"
                onChange={handleChange}
              />
              <label htmlFor="nickname">Nick Name</label>
              <input
                disabled={editProfile}
                className="w-full py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none font-overlock"
                type="text"
                id="nickname"
                defaultValue={currentUser.nickname}
                placeholder="Enter  nickname (optional):"
                onChange={handleChange}
              />
            </div>
          </div>
          {/* Right column */}
          <div className="space-y-8 md:col-start-2 md:col-end-3">
            <div className="shadow-form flex flex-col p-5 rounded-xl bg-white">
              <label htmlFor="bio">
                <h2>Bio</h2>
              </label>
              <textarea
                disabled={editProfile}
                id="bio"
                defaultValue={currentUser.bio}
                rows={8}
                cols={30}
                className="w-[95%] p-2 my-2 bg-transparent border rounded-xl border-black outline-none focus:outline-none font-overlock"
                placeholder="Write a bio about yourself..."
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col shadow-form p-5 rounded-xl w-[22rem] font-proxima-nova bg-white">
              <h2>Social Media Accounts</h2>
              <label htmlFor="twitter">Twitter</label>
              <input
                disabled={editProfile}
                className="w-full py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none font-overlock"
                type="text"
                id="twitter"
                defaultValue={currentUser.twitter}
                placeholder="Your Twitter handle"
                onChange={handleChange}
              />
              <label htmlFor="instagram">Instagram</label>
              <input
                disabled={editProfile}
                className="w-full py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none font-overlock"
                type="text"
                id="instagram"
                defaultValue={currentUser.instagram}
                placeholder="Your Instagram username"
                onChange={handleChange}
              />
              <label htmlFor="snapchat">Snapchat</label>
              <input
                disabled={editProfile}
                className="w-full py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none font-overlock"
                type="text"
                id="snapchat"
                defaultValue={currentUser.snapchat}
                placeholder="Your Snapchat username"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <Link
          className="text-white border-0 bg-[#69e091] rounded-md my-4 p-4 font-proxima-nova font-semibold text-center flex items-center justify-center hover:bg-[#1e7b3d] cursor-pointer no-underline"
          to={"/create-recipe"}
        >
          Create a new Recipe
        </Link>
      </form>
    </div>
  );
}
