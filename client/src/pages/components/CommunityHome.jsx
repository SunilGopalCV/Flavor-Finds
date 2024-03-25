import { useEffect, useState } from "react";
import axios from "axios";

export default function CommunityHome() {
  const [recentComments, setRecentComments] = useState([]);

  useEffect(() => {
    const fetchRecentComments = async () => {
      try {
        const res = await axios.get("/api/comment/recent");
        setRecentComments(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecentComments();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-[2rem] font-bold mb-4 font-brandon-grotesque text-[#114232]">
        Our Culinary Community
      </h1>
      <p className="font-proxima-nova text-primary w-[40rem] mb-8">
        Discover culinary triumphs from our community. See user reviews, find
        inspiration, and share your own kitchen adventures. Join Flavor
        Finds—where recipes come to life!
      </p>
      <div className="grid grid-cols-2 gap-6">
        {recentComments.slice(0, 4).map((comment) => (
          <div
            key={comment._id}
            className="bg-white shadow-md p-4 rounded-md flex flex-col justify-start max-w-[30rem]"
          >
            <img
              src={comment.user.avatar}
              alt="User Avatar"
              className="w-20 h-20 rounded-full mr-2 mb-2"
            />
            <span className="font-roboto text-[1.5rem] font-bold text-primary">
              {comment.user.username}
            </span>
            <p className="text-[#114232] font-proxima-nova">
              Commented on:{" "}
              <span className="font-bold">{comment.recipe.title}</span>
            </p>
            <p className="font-overlock text-primary">{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
