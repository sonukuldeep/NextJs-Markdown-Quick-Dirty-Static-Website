import Link from 'next/link'

const Post = ({ post }) => {
    const { frontmatter: { cover_image, date, title, excerpt } } = post
    return (
        <div className="card">
            <h3>{title}</h3>
            <img src={cover_image} alt={post.title} />
            <p>{excerpt}</p>
            <p>{date}</p>
            <Link href={`/blog/${post.slug}`} className='btn'>
                Read More
            </Link>
        </div>
    )
}

export default Post