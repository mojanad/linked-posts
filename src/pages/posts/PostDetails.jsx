import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router";
import SinglePost from "../../components/Posts/SinglePost";
import Skeleton from "react-loading-skeleton";

export default function PostDetails() {
  const { postId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["posts-details", postId],
    queryFn: getPostDetails,
    select: (data) => data.post,
  });

  async function getPostDetails() {
    try {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/posts/${postId}`,
        { headers: { token: localStorage.getItem("token") } }
      );
      return data;
    } catch (error) {
      return error;
    }
  }
  return (
    <div className="max-w-4xl mx-auto">
      {isLoading ? (
        <Skeleton className="h-[32rem]" />
      ) : (
        <SinglePost data={data} />
      )}
    </div>
  );
}
