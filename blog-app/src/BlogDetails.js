import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from './useFetch';

const BlogDetails = () => {

    const { id } = useParams();
    const [content, setContent ] = useState('');
    const history = useNavigate();
    const { data: blog, error, isPending } = useFetch('http://localhost:5000/api/posts/getSinglePost/' + id);
    // if (blog && blog.data && blog.data.length > 0) {
        // setContent(blog.data[0].bodyContent);
    // }

    useEffect( () => {
        setContent(blog && blog.data && blog.data.length > 0 && blog.data[0].bodyContent);
    },[blog])

    const handleDeleteClick = () => {
        fetch('http://localhost:5000/api/posts/deletePost/' + id, 
        { 
            method: 'DELETE',
            headers:
            {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem("token"),
            },
        }).then((res) => {
            res.json();
            // history('/');
        }).then((data) => {
            history('/');
        })
    }

    const handleEditClick = (e) => {
        // const data = "latest"
        console.log(content);
        fetch('http://localhost:5000/api/posts/updatePost', 
        { 
            
            method: 'put',
            headers:
            {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem("token"),
            },
            body: JSON.stringify({id, content})
        }).then((res) => {
            res.json();
        }).then(() => {
            history('/');
        })
    }

    return(
        <div className='blog-details'>
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {blog && blog.data && blog.data.length > 0 &&
            
            <article>
                <h2>{blog.data[0].title}</h2>
                <p>Written by {blog.data[0].author}</p>
                <textarea 
                value={content }
                onChange={e => {setContent(e.target.value)}}
                />
                <label type={"text"} value={"small"}/>
                <button onClick={handleDeleteClick}>Delete</button>
                <button onClick={handleEditClick}>Update</button>
            </article>
            
            }
            
        </div>
    );

}

export default BlogDetails;