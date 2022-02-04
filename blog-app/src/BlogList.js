import { Link } from 'react-router-dom';

const BlogList = (blogs, maintitle) => {
return ( 
    <div className="blog-list">
        <h2>{blogs.maintitle}</h2>
        {blogs && blogs.blogs && blogs.blogs.data && blogs.blogs.data.length > 0 && blogs.blogs.data.map(blog => (
            <div className="blog-preview" key={blog._id}>
                <Link to={`/details/${blog._id}`}>
                    <h2>{blog.title}</h2>
                    <p>Written by {blog.author}</p>
                </Link>
            </div>
        ))}
    </div>
 );

}

export default BlogList;