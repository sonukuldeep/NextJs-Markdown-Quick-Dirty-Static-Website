import Head from 'next/head'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Post from '../Component/Post.js'

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Static website</title>
      </Head>
      <div className="posts">
        {posts.map((post,index)=>{
          const {frontmatter: {title}} = post
          return <Post key={index} post={post}/>

        })}
      </div>
    </div>
  )
}


export async function getStaticProps() {
  // get posts from posts dir
  const files = fs.readdirSync(path.join('posts'))
 
  // get slug and front matter from posts
  const posts = files.map((filename) => {
 
    // create slug
    const slug = filename.replace('.md', '')

    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename), 'utf-8'
    )

    const { data: frontmatter } = matter(markdownWithMeta)
    return { slug, frontmatter }
  })
 
  return {
    props: {
      posts,
    },
  }
}