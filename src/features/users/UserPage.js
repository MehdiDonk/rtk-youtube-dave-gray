import { useSelector } from "react-redux";
import { selectUserById } from "../users/usersSlice";
import { selectAllPosts, selectPostsByUser } from "../posts/postsSlice";
import { Link, useParams } from "react-router-dom";

const UserPage = () => {
  const { userId } = useParams();
  const user = useSelector((state) => selectUserById(state, Number(userId)));

  // Filter returns a new array every time
  // A new selector will run every time an action is dispatched
  // When we dispatch increase count in the header then the useSelector runs again
  // And it forces the component to re render if a new reference value is returned
  // And we are returning a new reference value everytime with filter()
  // TO FIX = memoize selector
  const postsForUser = useSelector((state) => {
    const allPosts = selectAllPosts(state);
    return allPosts.filter((post) => post.userId === Number(userId));
  });

  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <section>
      <h2>{user?.name}</h2>

      <ol>{postTitles}</ol>
    </section>
  );
};

export default UserPage;
