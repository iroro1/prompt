"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Form from "../components/Form";

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user?.id,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  const [post, setPost] = useState({ prompt: "", tag: "" });
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      setSubmitting={setSubmitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
