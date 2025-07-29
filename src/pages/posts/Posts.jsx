import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import CreatePost from "../../components/Posts/CreatePost";
import SinglePost from "../../components/Posts/SinglePost";

export default function Posts() {
  const { data: allPosts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
    select: (data) => data.posts,
  });

  async function getAllPosts() {
    try {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/posts?limit=10`,
        { headers: { token: localStorage.getItem("token") } }
      );
      return data;
    } catch (error) {
      return error;
    }
  }
  return (
    <main className="p-4 max-w-4xl mx-auto">
      <CreatePost />

      {isLoading ? (
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
        allPosts?.map((p) => <SinglePost key={p._id} data={p} isHome={true} />)
      )}
    </main>
  );
}
