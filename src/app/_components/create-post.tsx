"use client";

// import { useRouter } from "next/navigation";
import { useState } from "react";

// import { api } from "@/trpc/react";

import { Button } from "@/components/ui/button";

export function CreatePost() {
  // const router = useRouter();
  const [name, setName] = useState("");

  // const createPost = api.post.create.useMutation({
  //   onSuccess: () => {
  //     router.refresh();
  //     setName("");
  //   },
  // });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log("calling createPost procedure...");
        // createPost.mutate({ name });
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="Title"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-full px-4 py-2 text-black"
      />
      <Button type="submit" disabled={true /*createPost.isLoading*/}>
        {/*createPost.isLoading*/ 0 > 1 ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
