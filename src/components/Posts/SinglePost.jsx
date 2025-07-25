import { Card } from "flowbite-react";
import { MessageText1, More } from "iconsax-reactjs";
import { Link, useNavigate, useParams } from "react-router";
import Comment from "./Comment";
import CreateComment from "./CreateComment";
import { useId } from "react";

export default function SinglePost({ data, isHome = false }) {
  const router = useNavigate();
  const { postId } = useParams();
  return (
    <Card
      // onClick={isHome ? () => router(`/posts/${data._id}`) : null}
      className="shadow-none border-none rounded-2xl my-4 "
    >
      {/* post header =========================== */}
      <div className="flex justify-between">
        <div className="flex  items-center gap-4">
          <div className="bg-gray-200 w-10 rounded-2xl overflow-hidden">
            <img
              src={data?.user.photo}
              alt={data?.user.name}
              className="w-100"
            />
          </div>
          <div className="flex flex-col">
            <h4 className="font-semibold">{data?.user.name}</h4>
            <p className="text-sm">
              {new Date(data?.createdAt).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
        <More size="32" color="#bbb" />
      </div>
      {/* post body =========================== */}
      <div>
        <p className="mb-3 text-gray-600">{data?.body}</p>
        <img src={data?.image} alt={data?.body} className="rounded-3xl " />
        {!postId && (
          <Link
            to={`/posts/${data._id}`}
            className="underline capitalize text-blue-600 mt-2 inline-block float-end"
          >
            see post details
          </Link>
        )}
      </div>
      {/* comments section =========================== */}
      <div className="flex gap-2 items-center mb-4">
        <MessageText1 size="24" color="#888" />
        <span>{data?.comments.length} comment</span>
      </div>
      {isHome && data?.comments.length ? (
        <Comment comment={data?.comments[0]} />
      ) : (
        data?.comments?.map((c) => (
          <Comment key={c._id} comment={c} userId={data?.user?._id} />
        ))
      )}
      <CreateComment postId={data._id} />
    </Card>
  );
}
