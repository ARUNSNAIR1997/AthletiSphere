import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


function SocialComment(){

const navigate = useNavigate()
const { commentId } = useParams();
  const [getView, setView] = useState(null); // changed from [] to null
  const [commentText, setCommentText] = useState({});
  const [getUser, setUser] = useState(JSON.parse(localStorage.getItem("userdata")));

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/sports/socialviewcomment/${commentId}`)
      .then((res) => res.json())
      .then((result) => {
        console.log("Fetched single post:", result);
        setView(result);
      });
  }, [commentId]);

  const handleComment = async (id) => {
    const text = commentText[id];
    let params = {
      user: getUser.firstname,
      comment: text
    };
    await fetch(`${process.env.REACT_APP_API_URL}/sports/socialcomment/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params)
    });
    setCommentText((prev) => ({ ...prev, [id]: "" }));
    refreshPost();
  };

  const refreshPost = () => {
    fetch(`${process.env.REACT_APP_API_URL}/sports/socialviewcomment/${commentId}`)
      .then((res) => res.json())
      .then((result) => setView(result));
  };

  if (!getView) return <p>Loading...</p>; // Handle loading state


    return(
        <>
        <div className="container body-cont">
      <div className="bg-gray-100 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white shadow rounded-lg p-4">

<div>
    <button className="backbtn" onClick={() => navigate(`/`)}><i class="fa-solid fa-arrow-left-long"></i></button>
</div>
            <div className="flex gap-2 mt-4">
              <input
                type="text"
                value={commentText[getView._id] || ""}
                onChange={(e) =>
                  setCommentText((prev) => ({
                    ...prev,
                    [getView._id]: e.target.value
                  }))
                }
                className="border rounded px-2 py-1 text-sm"
                placeholder="Write a comment..."
              />
              <button
                onClick={() => handleComment(getView._id)}
                className="btn btn-primary"
              >
                💬 Post
              </button>
            </div>

            {getView.comments && getView.comments.length > 0 && (
              <div className="mt-4">
                {getView.comments.map((cmt, i) => (
                  <p key={i} className="text-sm text-gray-700">
                    <strong>{cmt.user}</strong>: {cmt.comment}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
        </>
    )
}



export default SocialComment
