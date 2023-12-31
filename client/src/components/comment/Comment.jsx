// Comment.jsx
import axios from "axios";
import { useState, useContext } from "react";
import { Context } from "../../context/Context";
import "./comment.css";

export default function Comment({ postId, updateComments }) {
  const [comment, setComment] = useState("");
  const { user } = useContext(Context);

  const handleComment = async () => {
    try {
      await axios.post(`/comments/${postId}/comments`, {
        username: user.username,
        text: comment,
      });
      console.log("error in" );

      setComment("");
      // Call the updateComments function to refresh the comments list
      updateComments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="commentTop">
      <textarea
        className="commentInput"
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></textarea>
      <button className="commentButton" onClick={handleComment}>
        Post
      </button>
    </div>
  );
}
