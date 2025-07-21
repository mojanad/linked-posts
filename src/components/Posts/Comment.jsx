export default function Comment({ comment }) {
  return (
    <div className="p-2 rounded-2xl bg-gray-100">
      <div className="flex  items-center gap-4">
        <div className="bg-gray-200 w-10 rounded-2xl overflow-hidden">
          <img
            src={
              comment.commentCreator.photo.includes("undefined")
                ? "https://linked-posts.routemisr.com/uploads/default-profile.png"
                : comment.commentCreator.photo
            }
            alt={comment.commentCreator.name}
            className="w-100"
          />
        </div>
        <div className="flex flex-col">
          <h4 className="font-semibold">{comment.commentCreator.name}</h4>
          <p className="text-sm">
            {new Date(comment.createdAt).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
      <p className="text-gray-600">{comment.content}</p>
    </div>
  );
}
