import {Component} from 'react'
import Header from '../Header'
import UserStories from '../UserStories'
import UserPosts from '../UserPosts'
import './index.css'

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="home-container">
          <UserStories />
          <UserPosts />
        </div>
      </>
    )
  }
}

export default Home
