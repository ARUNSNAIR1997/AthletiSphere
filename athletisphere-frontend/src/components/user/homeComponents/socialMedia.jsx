import React, { useEffect, useState } from "react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigate } from "react-router-dom";
dayjs.extend(relativeTime);


function SocialMedia(){


const navigate = useNavigate()
const [getView, setView] = useState([])
const [commentText, setCommentText] = useState({}); // Track comments per post
const [getUser, setUser] = useState(JSON.parse(localStorage.getItem("userdata")));
// const [expandedComments, setExpandedComments] = useState("")


useEffect(()=>{
  fetch("http://localhost:8000/sports/socialview").then((res)=>res.json()).then((result)=>{
    console.log("post inserted",result);
    setView(result)
  })
},[])

//like
// const handleLike = async (id) => {
//     await fetch(`http://localhost:8000/sports/sociallike/${id}`, { method: "PUT" });
//     refreshPosts();
//   };

const handleLike = async (id) => {
  const payload = {
    userId: getUser._id
  };

  const res = await fetch(`http://localhost:8000/sports/sociallike/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const result = await res.json();
  if (res.ok) {
    refreshPosts();
  } else {
    alert(result); // show "User already liked this post"
  }
};

//comment
const handleComment = async (id) => {
    const text = commentText[id];
    let params = {
      user: getUser.firstname,
      comment: text
    }
    await fetch(`http://localhost:8000/sports/socialcomment/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    setCommentText((prev) => ({ ...prev, [id]: "" }));
    refreshPosts();
  };

  const refreshPosts = () => {
    fetch("http://localhost:8000/sports/socialview")
      .then((res) => res.json())
      .then((result) => setView(result));
  };


    return(
        <>
<div className="container body-cont">
       <div className="bg-gray-100 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Post Feed */}
        <div className="space-y-6">
          {getView.map((item, index) => (
            <div key={index} className="bg-white shadow rounded-lg p-4">
              {/* Header */}
              <div className="flex items-center mb-3">
                <img
                  src={`http://localhost:8000/img/${item.profile}`} // fixed interpolation
                  width={70}
                  height={70}
                  alt={item.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <h3 className="font-semibold text-lg text-gray-800">
                  {item.name}
                </h3>
<p className="text-sm text-gray-500 ml-auto">
  {dayjs(item.createdAt).fromNow()} • {dayjs(item.createdAt).format("MMM D, h:mm A")}
</p>


              </div>

              {/* Content */}
              <p className="mb-3 text-gray-700">{item.caption}</p>

              {/* Image */}
              {item.images && (
                <img
                  src={`http://localhost:8000/img/${item.images}`}
                  alt="Post visual"
                  className="d-block w-100"
                //   style={{ height: "500px", objectFit: "cover" }}
                />
              )}

              {/* Actions */}
             <div className="mt-3">
               <span onClick={() => handleLike(item._id)} style={{cursor: "pointer"}}>❤️ {item.likes} Likes</span>  •  <span onClick={() => navigate(`/comment/${item._id}`)} style={{cursor: "pointer"}}>💬 {item.comments?.length || 0} Comments</span> 
            </div>

            {/* <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
              <button onClick={() => handleLike(item._id)} className="hover:text-red-500">
                ❤️ Like
              </button>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={commentText[item._id] || ""}
                  onChange={(e) =>
                    setCommentText((prev) => ({ ...prev, [item._id]: e.target.value }))
                  }
                  className="border rounded px-2 py-1 text-sm"
                  placeholder="Write a comment..."
                />
                <button
                  onClick={() => handleComment(item._id)}
                  className="hover:text-blue-500"
                >
                  💬 Post
                </button>
              </div>
            </div>

          {item.comments && item.comments.length > 0 && (
              <div className="mt-2">
                {item.comments.map((cmt, i) => (
                  <p key={i} className="text-sm text-gray-700">
                    <strong>{cmt.user}</strong>: {cmt.comment}
                  </p>
                ))}
              </div>
            )} */}


{/* {item.comments && item.comments.length > 0 && (
  <div className="mt-2">
    {(expandedComments[item._id] ? item.comments : item.comments.slice(0, 1)).map((cmt, i) => (
      <p key={i} className="text-sm text-gray-700">
        <strong>{cmt.user}</strong>: {cmt.comment}
      </p>
    ))}
    {item.comments.length > 1 && (
      <button
        onClick={() =>
          setExpandedComments((prev) => ({
            ...prev,
            [item._id]: !prev[item._id],
          }))
        }
        className="text-blue-500 text-xs mt-1"
      >
        {expandedComments[item._id] ? "Hide comments" : `View all ${item.comments.length} comments`}
      </button>
    )}
  </div>
)} */}


            </div>
          ))}
        </div>
      </div>
    </div>

</div>

        </>
    )
}



export default SocialMedia