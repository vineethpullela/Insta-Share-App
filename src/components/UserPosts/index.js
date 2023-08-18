import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import UserInstaPosts from '../UserInstaPosts'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAl',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UserPosts extends Component {
  state = {apiStatus: apiStatusConstants.initial, userPosts: []}

  componentDidMount() {
    this.getUserPosts()
  }

  getUserPosts = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.posts.map(eachPost => ({
        postId: eachPost.post_id,
        profilePic: eachPost.profile_pic,
        userId: eachPost.user_id,
        userName: eachPost.user_name,
        createdAt: eachPost.created_at,
        LikesCount: eachPost.likes_count,
        postDetails: eachPost.post_details,
        comments: eachPost.comments,
        caption: eachPost.caption,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        userPosts: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickRetryAgain = () => {
    this.getUserPosts()
  }

  renderLoaderView = () => (
    <div className="loader_container">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://res.cloudinary.com/dj2tk6c0s/image/upload/v1692185688/insta%20share/alert-triangle_qfvygw.png"
        alt="failure view"
      />
      <h1 className="failure-view-heading">
        Something went wrong. Please try again.
      </h1>
      <button
        type="button"
        className="failure-view-button"
        onClick={this.onClickRetryAgain}
      >
        Try again
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {userPosts} = this.state

    return (
      <div>
        <ul className="user-posts-container">
          {userPosts.map(post => (
            <UserInstaPosts key={post.postId} userPost={post} />
          ))}
        </ul>
      </div>
    )
  }

  renderUserPosts = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()

      case apiStatusConstants.failure:
        return this.renderFailureView()

      case apiStatusConstants.success:
        return this.renderSuccessView()

      default:
        return null
    }
  }

  render() {
    return <div className="main-container">{this.renderUserPosts()}</div>
  }
}

export default UserPosts
