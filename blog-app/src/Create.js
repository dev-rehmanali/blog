import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Create = () => {

    const [title, setTitle] = useState('');
    const [bodyContent, setBodyContent] = useState('');
    const [author, setAuthor] = useState('');
    const [isPending, setIsPending] = useState(false);
    const history = useNavigate();

    const handleSubmit = (e) => {

        e.preventDefault();
        const blog = { title, bodyContent, author };

        setIsPending(true);

        fetch('http://localhost:5000/api/posts/addPost', {
            method: 'POST',
            headers:
            {
                "Content-Type": "application/json",
                'Authorization': localStorage.getItem("token"),
            },
            body: JSON.stringify(blog)
        })
            .then(res => res.json())
            .then((data) => {
                setIsPending(false);
                // console.log(data);  
                history('/');
            })
            .catch((error) => {
                console.log(error);
            })



    }


    return (
        <div className="create">
            <h2>Add a new Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog Title</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}

                />
                <label>Blog Body:</label>
                <textarea
                    required
                    value={bodyContent}
                    onChange={(e) => setBodyContent(e.target.value)}

                />
                <label>Blog Author:</label>
                <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}

                />
                {/* <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value={"Ali"}>Ali</option>
                    <option value={"Rehman"}>Rehman</option>
                    <option value={"Man"}>Man</option>
                    <option value={"Like"}>Like</option>
                </select> */}

                {<button>Add Blog</button>}
                {<button disabled>Adding Blog</button>}

            </form>
        </div>
    );

}

export default Create;