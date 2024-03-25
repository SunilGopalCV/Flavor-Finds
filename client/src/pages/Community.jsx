import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./components/Footer";

export default function Community() {
  const [recentComments, setRecentComments] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchRecentComments = async () => {
      try {
        const res = await axios.get("/api/comment/recent");
        setRecentComments(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecentComments();
  }, []);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div>
      <section className="text-center mb-12 flex flex-col align-middle items-center">
        <h1 className="text-[2.5rem] font-extrabold text-[#114232] font-brandon-grotesque mb-6">
          Our Culinary Community
        </h1>
        <p className="text-xl text-gray-700 w-[50rem] font-proxima-nova">
          Discover culinary triumphs from our community. See user reviews, find
          inspiration, and share your own kitchen adventures. Join Flavor Finds
          — where recipes come to life!
        </p>
      </section>

      <div className="flex items-center justify-center">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 gap-y-2">
          {recentComments
            .slice(0, showMore ? recentComments.length : 9)
            .map((comment) => (
              <article
                key={comment._id}
                className="bg-white rounded-xl overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 w-[23rem] my-2"
              >
                <header className="flex items-center space-x-4 p-6">
                  <img
                    src={comment.user.avatar}
                    alt="User Avatar"
                    className="w-16 h-16 rounded-full"
                  />
                  <h2 className="text-xl font-semibold text-primary">
                    {comment.user.username}
                  </h2>
                </header>
                <div className="px-6 py-4">
                  <h3 className="text-lg font-semibold mb-2">
                    Commented on:{" "}
                    <span className="text-primary">{comment.recipe.title}</span>
                  </h3>
                  <p className="text-gray-800">{comment.text}</p>
                </div>
              </article>
            ))}
        </section>
      </div>

      {recentComments.length > 9 && (
        <div className="text-center mt-12">
          <button
            onClick={toggleShowMore}
            className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-dark transition duration-300"
          >
            {showMore ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
}
