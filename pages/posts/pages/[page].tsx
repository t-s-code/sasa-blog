import Pagination from "@/components/Pagination/Pagination";
import SinglePost from "@/components/Post/SinglePost";
import Tag from "@/components/Tag/Tag";
import {
  MyPost,
  getAllTags,
  getNumberOfPages,
  getPostsByPage,
} from "@/lib/notionAPI";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

interface BlogPageListProps {
  postsByPage: MyPost[];
  numberOfPage: number;
  allTags: string[];
}

const BlogPageList = ({
  postsByPage,
  numberOfPage,
  allTags,
}: BlogPageListProps) => {
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
        <section className="sm:grid grid-cols-2 w-5/6 gap-3 mx-auto">
          {postsByPage.map((post, i) => (
            <div key={i}>
              <SinglePost
                title={post.title}
                description={post.description}
                date={post.date}
                tags={post.tags}
                slug={post.slug}
                isPaginationPage={true}
              />
            </div>
          ))}
        </section>
        <Pagination numberOfPage={numberOfPage} />
        <Tag tags={allTags} />
      </main>
    </div>
  );
};

export default BlogPageList;

export const getStaticProps: GetStaticProps = async (context) => {
  const currentPage = context.params?.page;
  const postsByPage =
    typeof currentPage === "string"
      ? await getPostsByPage(parseInt(currentPage.toString(), 10))
      : [];
  const numberOfPage = await getNumberOfPages();
  const allTags = await getAllTags();

  return {
    props: {
      postsByPage,
      numberOfPage,
      allTags,
    },
    revalidate: 60 * 60 * 24,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const numberOfPage = await getNumberOfPages();
  let params = [];
  for (let i = 0; i <= numberOfPage; i++) {
    params.push({ params: { page: i.toString() } });
  }

  return {
    paths: params,
    fallback: "blocking",
  };
};
