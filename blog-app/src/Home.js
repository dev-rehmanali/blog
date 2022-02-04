import BlogList from './BlogList';
import useFetch from './useFetch';

const Home = () => {

    const {data: blogs, isPending, error} = useFetch('http://localhost:5000/api/posts/getAllPosts');

    return ( 
        <div className="home">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            <BlogList blogs={blogs} maintitle="All Blogs"/>
        </div>
     );


};

export default Home;