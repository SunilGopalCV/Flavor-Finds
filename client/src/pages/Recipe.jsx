import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Footer from "./components/Footer";

export default function Recipe() {
  const { currentUser } = useSelector((state) => state.user);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const params = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const recipeRes = await fetch(`/api/recipe/get/${params.recipeId}`);
        const recipeData = await recipeRes.json();
        if (recipeData.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setRecipe(recipeData);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [params.recipeId]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsRes = await fetch(
          `/api/comment/recipe/${params.recipeId}`
        );
        const commentsData = await commentsRes.json();
        if (Array.isArray(commentsData)) {
          setComments(commentsData);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [params.recipeId]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          recipe: params.recipeId,
          text: commentText,
          user: currentUser._id,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setComments((prevComments) => [...prevComments, data]);
        setCommentText("");
      } else {
        console.error("Failed to create comment");
      }
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  return (
    <main className="bg-[#f6fff9]">
      {loading && (
        <p className="font-proxima-nova text-primary text-center h-max text-5xl">
          Loading...
        </p>
      )}
      {error && (
        <p className="font-proxima-nova text-primary text-center h-max text-5xl">
          Something went Wrong
        </p>
      )}
      {recipe && !loading && !error && (
        <>
          <div className="flex mb-10 pt-10">
            <div>
              <img
                className="object-cover object-center w-[24rem] h-[30rem] rounded-lg rounded-br-[7.8rem] shadow-form mx-20 "
                src={recipe.imageUrl}
                alt="Food"
              />
              <div className="w-[70%] mx-auto my-[3rem]">
                <div className="flex justify-between align-middle">
                  <span className="font-roboto font-bold text-primary text-[2rem]">
                    Ingredients
                  </span>
                  <span className="flex justify-center align-middle">
                    <button
                      className="ml-4 bg-primary text-white rounded-full text-[1.25rem] px-4 focus:outline-none"
                      onClick={() => {
                        if (recipe.servings > 1) {
                          const newServings = recipe.servings - 1;
                          setRecipe((prevRecipe) => ({
                            ...prevRecipe,
                            servings: newServings,
                          }));
                        }
                      }}
                    >
                      -
                    </button>
                    <span className="mx-2 text-[1.5rem]">
                      {recipe.servings}
                    </span>
                    <button
                      className="bg-primary text-white rounded-full text-[1.25rem] px-3 focus:outline-none"
                      onClick={() => {
                        const newServings = recipe.servings + 1;
                        setRecipe((prevRecipe) => ({
                          ...prevRecipe,
                          servings: newServings,
                        }));
                      }}
                    >
                      +
                    </button>
                  </span>
                </div>
                <div className="font-proxima-nova text-primary">
                  {recipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex items-center mt-4">
                      <div className="w-8 h-8 flex justify-center items-center bg-[#114232] text-white rounded-full mr-4">
                        {index + 1}
                      </div>
                      <div style={{ width: "28rem" }}>
                        {ingredient.name}:{" "}
                        {ingredient.quantity * recipe.servings}{" "}
                        {ingredient.unit}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-[3.5rem] font-roboto text-primary">
                {recipe.title}
              </h1>
              <div className="flex space-x-6 font-proxima-nova text-primary">
                <span className="px-4 py-2 border-2 border-solid border-[#daffbc] rounded-full font-bold shadow-form">
                  {recipe.cuisine}
                </span>
                <span className="px-4 py-2 border-2 border-solid border-[#fcffbc] rounded-full font-bold shadow-form">
                  {recipe.difficulty}
                </span>
              </div>
              <p className="font-proxima-nova text-[1.4rem] py-7 text-primary">
                Total Time: {recipe.totalTime} minutes
              </p>
              <div>
                <p className="font-roboto font-bold text-primary text-[2rem]">
                  Description
                </p>
                <div className="font-proxima-nova text-primary py-4 border-t-4 border-solid border-[#114232]">
                  {recipe.description}
                </div>
              </div>
              <div>
                <p className="font-roboto font-bold text-primary text-[2rem]">
                  Nutrition Per Serving
                </p>
                <div>
                  <div className="font-proxima-nova text-primary flex space-x-8">
                    {recipe.calories && (
                      <div className="h-[7rem] flex flex-col items-center bg-[#eb8484] px-2 py-1 rounded-full">
                        <div className="bg-white w-[3rem] h-[3rem] flex justify-center items-center rounded-full p-2 m-0 text-[1.2rem]">
                          {recipe.calories} kcal
                        </div>
                        <div className="mt-2 text-white">Calories</div>
                      </div>
                    )}

                    {recipe.protein && (
                      <div className="h-[7rem] flex flex-col items-center bg-[#ebd884] px-2 py-1 rounded-full">
                        <div className="bg-white w-[3rem] h-[3rem] flex justify-center items-center rounded-full p-2 m-0 text-[1.2rem]">
                          {recipe.protein} g
                        </div>
                        <div className="mt-2 text-white">Protein</div>
                      </div>
                    )}

                    {recipe.carbohydrates && (
                      <div className="h-[7rem] flex flex-col items-center bg-[#adeb84] px-2 py-1 rounded-full">
                        <div className="bg-white w-[3rem] h-[3rem] flex justify-center items-center rounded-full p-2 m-0 text-[1.2rem]">
                          {recipe.carbohydrates} g
                        </div>
                        <div className="w-[3rem] mt-1 text-white">
                          Carboh
                          <br /> ydrates
                        </div>
                      </div>
                    )}

                    {recipe.fat && (
                      <div className="h-[7rem] flex flex-col items-center bg-[#84d0eb] px-2 py-1 rounded-full">
                        <div className="bg-white w-[3rem] h-[3rem] flex justify-center items-center rounded-full p-2 m-0 text-[1.2rem]">
                          {recipe.fat} g
                        </div>
                        <div className="mt-2 text-white">Fat</div>
                      </div>
                    )}

                    {recipe.fiber && (
                      <div className="h-[7rem] flex flex-col items-center bg-[#9a84eb] px-2 py-1 rounded-full">
                        <div className="bg-white w-[3rem] h-[3rem] flex justify-center items-center rounded-full p-2 m-0 text-[1.2rem]">
                          {recipe.fiber} g
                        </div>
                        <div className="mt-2 text-white">Fiber</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <p className="font-roboto font-bold text-primary text-[2rem]">
                  Instructions
                </p>
                <div className="font-proxima-nova text-primary">
                  {recipe.instructions.map((instruction, index) => (
                    <div key={index} className="flex items-center mt-4">
                      <div className="w-8 h-8 flex justify-center items-center bg-[#114232] text-white rounded-full mr-4">
                        {index + 1}
                      </div>
                      <div style={{ width: "28rem" }}>{instruction.step}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-[85%] mx-auto">
            <span className="font-roboto font-bold text-primary text-[2rem]">
              Comments ({comments.length})
            </span>
            <form
              className="flex my-5 items-center"
              onSubmit={handleSubmitComment}
            >
              {currentUser ? (
                <img
                  className="w-[2rem] h-[2rem] rounded-full"
                  src={currentUser.avatar}
                  alt="profile"
                />
              ) : (
                <FontAwesomeIcon
                  className="w-[2rem] h-[2rem]"
                  icon={faCircleUser}
                  style={{ color: "#717171" }}
                />
              )}
              <input
                value={commentText}
                type="text"
                className="w-full py-2 my-2 text-[1.5rem] mx-6 bg-transparent border-b border-black outline-none focus:outline-none font-overlock"
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a Comment . . ."
              />
              <button
                className="my-4 mx-4 bg-[#114232] text-white rounded-md py-2 px-4 text-[1.1rem] hover:bg-[#1c644c]"
                type="submit"
              >
                Submit
              </button>
            </form>
            {comments
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort comments by createdAt in descending order
              .map((comment) => (
                <div
                  key={comment._id}
                  className="flex-col py-5 items-center border-b-2 border-solid border-[#adadad]"
                >
                  <div className="flex items-center mt-2">
                    {comment.user.avatar && (
                      <img
                        src={comment.user.avatar}
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full mr-2"
                      />
                    )}
                    <p className="text-sm font-bold">{comment.user.username}</p>
                    <p className="text-sm text-gray-500 ml-auto font-bold">
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <p className="font-proxima-nova text-primary text-[1.2em]">
                    {comment.text}
                  </p>
                </div>
              ))}
          </div>
          <Footer />
        </>
      )}
    </main>
  );
}
