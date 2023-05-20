import SinglePost from "@/components/Post/SinglePost";
import Tag from "@/components/Tag/Tag";
import { NUMBER_OF_POSTS_PER_PAGE } from "@/constants/constants";
import { MyPost, getAllTags, getPostsForTopPage } from "@/lib/notionAPI";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";

interface HomeProps {
  fourPosts: MyPost[];
  allTags: string[]
}

export default function Home({ fourPosts, allTags }: HomeProps) {
  return (
    <div className="container h-full w-full mx-auto">
      <Head>
        <title>Tech Blog</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container w-full mt-16">
        <h1 className="text-5xl font-medium text-center mb-16">
          Notion Blog🚀
        </h1>
        {fourPosts.map((post, i) => (
          <div key={i} className="mx-4">
            <SinglePost
              title={post.title}
              description={post.description}
              date={post.date}
              tags={post.tags}
              slug={post.slug}
              isPaginationPage={false}
            />
          </div>
        ))}
        <Link href="posts/pages/1" className="mb-6 lg:w-1/2 mx-auto rounded-md px-5 block text-right">
          ...もっと見る
        </Link>
        <Tag tags={allTags} />
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const fourPosts = await getPostsForTopPage(NUMBER_OF_POSTS_PER_PAGE);
  const allTags = await getAllTags()

  return {
    props: {
      fourPosts,
      allTags,
    },
    revalidate: 10,
  };
};
