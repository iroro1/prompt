"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import userImg from "../../public/assets/images/logo.png";
import tick from "../../public/assets/icons/tick.svg";
import copyImg from "../../public/assets/icons/copy.svg";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copy, setCopy] = useState("");
  const { data: session } = useSession();
  const pathName = usePathname();
  const handleCopy = () => {
    setCopy(post?.prompt);
    navigator.clipboard.writeText(post?.prompt);

    setTimeout(() => setCopy(" "), 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          {post?.creator?.Image ? (
            <Image
              src={post?.creator?.Image || userImg}
              alt="creator_image"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />
          ) : post?.creator?.username[0] ? (
            <div className=" h-[40px] w-[40px] rounded-full bg-orange-400 flex items-center justify-center text-white font-bold">
              {post?.creator?.username[0]}
            </div>
          ) : (
            <Image
              src={userImg}
              alt="creator_image"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />
          )}

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post?.creator?.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post?.creator?.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={copy === post?.prompt ? tick : copyImg}
            width={12}
            height={12}
            alt="copy"
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post?.prompt}</p>
      <p
        onClick={() => handleTagClick && handleTagClick(post?.tag)}
        className="font-inter text-sm blue_gradient cursor-pointer"
      >
        {post?.tag?.toString()[0] === "#"
          ? "# " + post?.tag.toString().slice(1)
          : `# ${post.tag}`}
      </p>

      {session?.user.id === post?.creator?._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 boeder-t  border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
