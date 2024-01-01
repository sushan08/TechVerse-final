import Post from '../post/Post';
import './posts.css';

export default function Posts({ posts }) {
  // Check if `posts` is an array before mapping over it
  if (!Array.isArray(posts)) {
    console.error('Posts must be an array');
    return null; // or display an error message or handle the situation accordingly
  }

  return (
    <div className="posts">
      {posts.map((p) => (
        <Post key={p._id} post={p} />
      ))}
    </div>
  );
}
