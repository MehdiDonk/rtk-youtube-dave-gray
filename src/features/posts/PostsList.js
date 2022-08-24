import { useSelector } from "react-redux";
import { selectAllPosts, getPostsStatus, getPostsError } from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
  // const effectRan = useRef(false);

  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  /*
  // If fetch post wasn't in the INDEX.JS
  // Comment serves as an exemple
  useEffect(() => {
    if (effectRan.current === false) {
      if (postsStatus === "idle") {
        // Dispatching the async thunk
        dispatch(fetchPosts());
      }
      return () => (effectRan.current = true);
    }
  }, [postsStatus, dispatch]);
  */

  let content;
  if (postsStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (postsStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <PostsExcerpt key={post.id} post={post} />
    ));
  } else if (postsStatus === "error") {
    content = <p>{error}</p>;
  }

  return <section>{content}</section>;
};

export default PostsList;
