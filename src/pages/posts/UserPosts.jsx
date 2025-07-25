import { useQuery } from "@tanstack/react-query";
import SinglePost from "../../components/Posts/SinglePost";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import CreatePost from "../../components/Posts/CreatePost";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

export default function UserPosts() {
  const {
    data: allPosts,
    isLoading,
    isRefetching,
  } = useQuery({
    queryKey: ["user-posts"],
    queryFn: getAllPosts,
    select: (data) => data.posts,
  });

  const userId = localStorage.getItem("userId");

  async function getAllPosts() {
    try {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/users/${userId}/posts?limit=2`,
        { headers: { token: localStorage.getItem("token") } }
      );
      return data;
    } catch (error) {
      return error;
    }
  }

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <Helmet>
        <title>user posts</title>
      </Helmet>
      <CreatePost />
      {isLoading || isRefetching ? (
        <div className="max-w-4xl mx-auto flex-col flex  gap-4">
          {Array.from({ length: 10 }).map((item) => (
            <Skeleton
              key={item}
              className="h-[32rem]"
              baseColor="#ddd"
              style={{ borderRadius: "16px" }}
            />
          ))}
        </div>
      ) : (
        allPosts?.map((p) => <SinglePost key={p._id} data={p} />)
      )}
    </main>
  );
}
