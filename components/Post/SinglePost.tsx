import { MyPost } from "@/lib/notionAPI";
import Link from "next/link";
import React from "react";

interface SinglePostProps extends Omit<MyPost, "id"> {
  isPaginationPage: boolean;
}

const SinglePost = (props: SinglePostProps) => {
  const { title, description, date, tags, slug, isPaginationPage } = props;

  return isPaginationPage ? (
    <section className="bg-gray-400 mb-8 mx-auto rounded-md p-5 shadow-none hover:shadow-xl hover:-translate-y-1 transition-all duration-150">
      <div className="lg:flex items-center">
        <Link href={`/posts/${slug}`}>
          <h2 className="text-2xl font-medium mb-2">{title || "No Title"}</h2>
        </Link>
        <div className="mr-2">{date || "No Date"}</div>
        {tags.length > 0 &&
          tags.map((tag, i) => (
            <Link key={i} href={`posts/tags/${tag}/pages/1`}>
              <span className="text-white bg-black rounded-xl px-2 mr-2">
                {tag}
              </span>
            </Link>
          ))}
      </div>
      <p>{description || "No Description"}</p>
    </section>
  ) : (
    <section className="lg:w-1/2 bg-gray-400 mb-8 mx-auto rounded-md p-5 shadow-none hover:shadow-xl hover:-translate-y-1 transition-all duration-150">
      <div className="flex items-center gap-3">
        <Link href={`/posts/${slug}`}>
          <h2 className="text-2xl font-medium mb-2">{title || "No Title"}</h2>
        </Link>
        <div>{date || "No Date"}</div>
        {tags.length > 0 &&
          tags.map((tag, i) => (
            <Link key={i} href={`posts/tags/${tag}/pages/1`}>
              <span className="text-white bg-black rounded-xl px-2">{tag}</span>
            </Link>
          ))}
      </div>
      <p>{description || "No Description"}</p>
    </section>
  );
};

export default SinglePost;