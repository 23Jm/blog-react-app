import Header from "./Header";
import Nav from "./Nav";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import Footer from "./Footer";
import { useEffect, useState} from "react";
import {format} from "date-fns"
import { Routes, Route, useNavigate } from "react-router-dom";



function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: "June 12 2023",
      body: "I wished my friend for her Birthday",
    },
    {
      id: 2,
      title: "My Second Post",
      datetime: "Dec 2 2023",
      body: "I made a website using HTML and CSS.",
    },
    {
      id: 3,
      title: "My Third Post",
      datetime: "Dec 8 2023",
      body: "I started learning Bootstrap from scratch",
    },
    {
      id: 4,
      title: "My Fourth Post",
      datetime: "Dec 22 2023",
      body: "I attended a workshop about web development",
    },
  ]);
  const [search,setSearch]=useState('')
  const [searchResults,setSearchResults]=useState([])
  const [postTitle,setPostTitle]=useState('')
  const [postBody,setPostBody]=useState('')
  const navigate= useNavigate();;

  useEffect(()=>{
    const filteredResults=posts.filter((post)=>((post.body).toLowerCase()).includes(search.toLowerCase())||((post.title).toLowerCase()).includes(search.toLowerCase()))
    setSearchResults(filteredResults.reverse())
},[posts,search])

  const handleSubmit=(e)=>{
    e.preventDefault();
    const id=posts.length?posts[posts.length-1].id+1:1;
    const datetime=format(new Date(),'mmmm dd yyyy pp');
    const newPost={id,title:postTitle,datetime,body:postBody};
    const allPosts=[...posts,newPost]
    setPosts(allPosts)
    setPostTitle('');
    setPostBody('');}

  const handleDelete=(id)=>{
    const postsList=posts.filter(post=>post.id!==id)
    setPosts(postsList);
    navigate('/');
  }
  return (
    <div className="App">
      <Header title="React JS Blog" />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home posts={searchResults} />} />
        <Route path="/post">
           <Route index element={<NewPost
              handleSubmit={handleSubmit}
              postBody={postBody}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              setPostBody={setPostBody}
            />
            }/>
            <Route path=":id" element={<PostPage posts={posts} handleDelete={handleDelete}/>}/>
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );}

export default App;
