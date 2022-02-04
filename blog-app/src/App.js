import Navbar from './Navbar';
import Home from './Home';
import Create from './Create';
import BlogDetails from './BlogDetails';
import NotFound from './NotFound';
import Login from './Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './SignUp';
import BlogList from './BlogList';
import Protected from './Pretected';
import LogOut from './LogOut';


function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <div className='content'>
          <Routes>
            <Route exact path="/" element={<Protected Component={Home}/>} />
            <Route exact path="/create" element={<Protected Component={Create} />} />
            <Route exact path="/bloglist" element={<Protected Component={BlogList} />} />
            <Route exact path="/details/:id" element={<Protected Component={BlogDetails} />} />
            <Route exact path="/logout" element={<Protected Component={LogOut} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
