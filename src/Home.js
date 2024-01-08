import React from "react"
import Feed from "./Feed"
import { Link } from "react-router-dom"

const Home = ({posts}) => {
  return (
    <main className="Home">
      {posts.length?(<Feed posts={posts}/>)
      :(<p style={{marginTop:"2rem"}}>No posts to display</p>)}
      <Link to="/"/>
    </main>
  )
}

export default Home