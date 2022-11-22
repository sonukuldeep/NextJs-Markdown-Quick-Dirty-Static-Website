import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import Link from 'next/link'

export default function PostPage({
  frontmatter: { title, date, cover_image },
  content,
}) {
  return (
    <>
    {/* display the content in page */}
      <Link href='/' className='btn btn-back'>
        Go Back
      </Link>
      <div className='card card-page'>
        <h1 className='post-title'>{title}</h1>
        <div className='post-date'>Posted on {date}</div>
        <img src={cover_image} alt='' />
        <div className='post-body'>
          <div dangerouslySetInnerHTML={{ __html: marked.parse(content) }}></div>
        </div>
      </div>
    </>
  )
}

// create an array of all files contained in post dir with the title
export async function getStaticPaths() {

  const files = fs.readdirSync(path.join('posts'))
  const paths = files.map((filename) => {
    const slug = filename.replace('.md', '')
    return {params: { slug, }}
  })
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params: slug }) {
  const markdownWithMeta = fs.readFileSync(

    // link to file that will be generated
    path.join('posts', slug.slug + '.md'),
    'utf-8'
  )
  const { data: frontmatter, content } = matter(markdownWithMeta)

  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  }
}
