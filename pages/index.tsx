import AzureLogo from '@/components/Icons/AzureLogo'
import CSS3Logo from '@/components/Icons/CSS3Logo'
import GitHubLogo from '@/components/Icons/GitHubLog'
import HTML5Logo from '@/components/Icons/HTML5Logo'
import JSLogo from '@/components/Icons/JSLogo'
import NextLogo from '@/components/Icons/NextLogo'
import ReactLogo from '@/components/Icons/ReactLogo'
import TSLogo from '@/components/Icons/TSLogo'
import TailwindCSSLogo from '@/components/Icons/TailwindCSSLogo'
import TwitterLogo from '@/components/Icons/TwitterLogo'
import { NAVBAR_GLOBAL_HEIGHT } from '@/components/Navbar/Navbar'
import SinglePost from '@/components/Post/SinglePost'
import Tag from '@/components/Tag/Tag'
import {
  AZURE_TOOLTIP,
  CSS3_TOOLTIP,
  HTML5_TOOLTIP,
  JS_TOOLTIP,
  NEXT_TOOLTIP,
  NUMBER_OF_POSTS_PER_PAGE,
  REACT_TOOLTIP,
  TAILWINDCSS_TOOLTIP,
  TS_TOOLTIP,
} from '@/constants/constants'
import { MyPost, TagType, getAllTags, getPostsForTopPage } from '@/lib/notionAPI'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Tooltip } from 'react-tooltip'

interface HomeProps {
  fourPosts: MyPost[]
  allTags: TagType[]
}

const IMAGE_PATH = '/me.jpg'
const GITHUB_URL = 'https://github.com/t-s-code'

export default function Home({ fourPosts, allTags }: HomeProps) {
  return (
    <div className='h-full w-full mx-auto'>
      <Head>
        <title>Sasa Blog</title>
        <meta name='description' content='' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='w-full px-56 pt-8'>
        <section
          className='min-h-min'
          style={{ minHeight: `calc(100vh - ${NAVBAR_GLOBAL_HEIGHT})` }}
        >
          <h1 className='text-5xl font-medium text-gray-500'>
            About
            <div className='w-96 mt-3 border-b-2' />
          </h1>
          <div className='flex items-center justify-center min-w-min h-80 mt-32 gap-28'>
            <div className='relative min-w-[288px] w-72 h-72 rounded-full overflow-hidden'>
              <Image src={IMAGE_PATH} alt='portrait' fill sizes='100vw' className='object-cover' />
            </div>
            <div className='h-72 w-[480px] flex flex-col justify-between items-start'>
              <div>
                <h2 className='text-4xl text-gray-400'>Front-End React(Next.js)</h2>
                <h2 className='text-4xl text-gray-400 mt-3'>Developer</h2>
              </div>
              <div className='text-gray-400'>
                <p>
                  ポートフォリオをご覧いただきありがとうございます。都内でフロントエンドエンジニアをしています。
                </p>
                <p className=' mt-2'>名前: Tatsuya Sasaki</p>
                <p>年齢: 26</p>
                <p>場所: 東京</p>
              </div>
              <div className='flex items-center justify-start gap-3'>
                <Link href={GITHUB_URL} target='_blank'>
                  <GitHubLogo />
                </Link>
                <TwitterLogo />
              </div>
            </div>
          </div>
          <div className='flex items-center justify-center h-60'>
            <p className='text-gray-400 text-lg font-bold'>Skill Stack</p>
            <p className='ml-14'>|</p>
            <div className='flex justify-between items-center gap-8 ml-14'>
              <span data-tooltip-id='skill-tooltip' data-tooltip-html={HTML5_TOOLTIP}>
                <HTML5Logo />
              </span>
              <span data-tooltip-id='skill-tooltip' data-tooltip-html={CSS3_TOOLTIP}>
                <CSS3Logo />
              </span>
              <span data-tooltip-id='skill-tooltip' data-tooltip-html={JS_TOOLTIP}>
                <JSLogo />
              </span>
              <span data-tooltip-id='skill-tooltip' data-tooltip-html={TS_TOOLTIP}>
                <TSLogo />
              </span>
              <span data-tooltip-id='skill-tooltip' data-tooltip-html={REACT_TOOLTIP}>
                <ReactLogo />
              </span>
              <span data-tooltip-id='skill-tooltip' data-tooltip-html={NEXT_TOOLTIP}>
                <NextLogo />
              </span>
              <span data-tooltip-id='skill-tooltip' data-tooltip-html={TAILWINDCSS_TOOLTIP}>
                <TailwindCSSLogo />
              </span>
              <span data-tooltip-id='skill-tooltip' data-tooltip-html={AZURE_TOOLTIP}>
                <AzureLogo />
              </span>
            </div>
          </div>
        </section>

        <section>
          <h1 className='text-5xl font-medium text-gray-500'>
            Articles
            <div className='w-96 mt-3 border-b-2' />
          </h1>
          {fourPosts.map((post, i) => (
            <div key={i} className='mt-14 min-w-min'>
              <SinglePost
                title={post.title}
                description={post.description}
                date={post.date}
                tags={post.tags}
                slug={post.slug}
                genre={post.genre}
                thumbnail={post.thumbnail}
              />
            </div>
          ))}
          <div className='mt-28 mb-6 w-full flex justify-end'>
            <Link href='posts/pages/1' className='text-gray-500 hover:opacity-80 hover:underline'>
              ...もっと見る
            </Link>
          </div>
          {/* <Tag tags={allTags} /> */}
        </section>
      </main>
      <style>
        {`.example-diff-arrow {
          color: #fff;
          background-color: rgb(55, 55, 55);
        }

        .example-arrow {
          backgroundColor: rgb(222, 34, 72);
        }`}
      </style>
      <Tooltip
        id='skill-tooltip'
        noArrow
        style={{
          backgroundColor: 'white',
          color: '#535353',
          borderWidth: '1px',
          borderColor: '#65D2FE',
        }}
      />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const fourPosts = await getPostsForTopPage(NUMBER_OF_POSTS_PER_PAGE)
  const allTags = await getAllTags()

  console.log(fourPosts)

  return {
    props: {
      fourPosts,
      allTags,
    },
    revalidate: 10,
  }
}
