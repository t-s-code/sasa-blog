import { getAllPosts, getSinglePost } from "@/lib/notionAPI";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Link from "next/link";
import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

type SlugPageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Post = ({ post }: SlugPageProps) => {
  return (
    <section className="container lg:px-2 px-5 h-screen lg-2/5 mx-auto mt-20">
      <h2 className="w-full text-2xl font-medium">{post.metadata?.title}</h2>
      <div className="border-b-2 w-1/3 mt-1 border-black"></div>
      <span className="text-gray-500">Posted at {post.metadata?.date}</span>
      <br />
      {post.metadata?.tags.map((tag: string, i) => (
        <p
          key={i}
          className="text-white bg-black rounded-xl font-medium mt-2 mr-2 px-2 inline-block"
        >
          <Link key={i} href={`/posts/tags/${tag}/pages/1`}>
            {tag}
          </Link>
        </p>
      ))}
      <div className="mt-10 font-medium">
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  {...props}
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code {...props} className={className}>
                  {children}
                </code>
              );
            },
          }}
        >
          {post.markdown}
        </ReactMarkdown>
        <div className="mt-3 pb-10 text-blue-700 underline text-sm">
          <Link href="/">←ホームに戻る</Link>
        </div>
      </div>
    </section>
  );
};

export default Post;

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  if (!params?.slug || typeof params.slug !== "string") return;
  const post = await getSinglePost(params.slug);

  return {
    props: {
      post,
    },
    revalidate: 10,
  };
};

export const getStaticPaths = async () => {
  const allPosts = await getAllPosts();
  const paths = allPosts.map((post) => ({
    params: { slug: post ? post.slug : "" },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};
