import axios from 'axios';

export default function BlogPost({ post }) {
  if (!post) return <div>Loading...</div>;

  return (
    <article>
      <h1>{post.title}</h1>
      <div className="meta">
        <span>{post.date}</span>
        <span>{post.readTime}</span>
        <span>{post.category}</span>
      </div>
      <div className="excerpt">{post.excerpt}</div>
      {/* Use a safe HTML renderer like react-html-parser or dangerouslySetInnerHTML */}
      <div className="content" dangerouslySetInnerHTML={{ __html: post.formattedContent }} />
    </article>
  );
}

export async function getStaticPaths() {
  // Fetch all blog posts to get their slugs
  const response = await axios.get('http://localhost:1337/api/blog-posts');
  const paths = response.data.data.map((post) => ({
    params: { slug: post.Slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  try {
    const response = await axios.get(
      `http://localhost:1337/api/blog-posts?filters[Slug][$eq]=${params.slug}`
    );
    
    const post = response.data.data[0];

    if (!post) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        post: {
          title: post.Title,
          excerpt: post.Excerpt,
          content: post.Content,
          date: post.Date,
          readTime: post.Read,
          category: post.Category,
          formattedContent: post.dynamic1
        },
      },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return {
      notFound: true,
    };
  }
} 