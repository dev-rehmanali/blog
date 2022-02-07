import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from './useFetch';

const BlogDetails = () => {

    const { id } = useParams();
    const [content, setContent ] = useState('');
    const [commentContent, setCommentContent] = useState('');
    const history = useNavigate();
    const { data: blog, error, isPending } = useFetch('http://localhost:5000/api/posts/getSinglePost/' + id);
    const {data: commentsList, isPending: isListPending,error: commentError} = useFetch('http://localhost:5000/api/comments/getCommentsByPost/' + id);
    // if (blog && blog.data && blog.data.length > 0) {
        // setContent(blog.data[0].bodyContent);
    // }
    // console.log(commentsList[0].content);
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

    const handlePostComment = (e) => {

        console.log(commentContent);
        const userId = localStorage.getItem('userId');
        const userName = localStorage.getItem('userName');
        const postId = id;
        const content = commentContent;
        fetch('http://localhost:5000/api/comments/postComment', 
        { 
            
            method: 'post',
            headers:
            {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem("token"),
            },
            body: JSON.stringify({content, userName, userId, postId })
        }).then((res) => {
            res.json();
        }).then(() => {
            history('/');
        })
        console.log("Clicked Comment Button");


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
                <div className='comments'>
                    <div className='list'>

                        <ul className='comments-list'>
                            {commentsList && commentsList.length > 0 && commentsList.map(comment => { return ( 
                                <div className='lidiv' key={ comment._id }>
                                    <li className='every-comment' > <h4>{comment.commentedBy}</h4> { comment.content } </li>
                                </div>)
                                
                            }) }
                        </ul>
                    </div>
                    <div>
                        <input 
                        placeholder='Post comment here'
                        type={"text"} 
                        onChange={e => { setCommentContent(e.target.value)} }
                        />
                        <button onClick={handlePostComment}>Post</button>



                    </div>

                </div>
                <button onClick={handleDeleteClick}>Delete</button>
                <button onClick={handleEditClick}>Update</button>
            </article>
            
            }
            
        </div>
    );

}

export default BlogDetails;