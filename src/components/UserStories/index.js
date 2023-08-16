import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Slider from 'react-slick'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAl',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UserStories extends Component {
  state = {apiStatus: apiStatusConstants.success, storiesList: []}

  componentDidMount() {
    this.getStoryData()
  }

  getStoryData = async () => {
    this.setState({apiStatus: apiStatusConstants.initial})

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/insta-share/stories`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.users_stories.map(eachStory => ({
        userName: eachStory.user_name,
        userId: eachStory.user_id,
        storyUrl: eachStory.story_url,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        storiesList: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoaderView = () => (
    <div className="user_story_loader_container">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure_view_container">
      <img
        src="https://res.cloudinary.com/dj2tk6c0s/image/upload/v1692185688/insta%20share/alert-triangle_qfvygw.png"
        alt="failure_view"
        className="user_story_failure_img"
      />
      <h1 className="failure-heading">
        Something went worng. Please try again
      </h1>
      <button type="button" className="failure_button">
        Try Again
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {storiesList} = this.state

    return (
      <ul className="slider-container">
        <Slider>
          {storiesList.map(eachStory => (
            <li key={eachStory.userId} className="story-container">
              <img
                src={eachStory.storyUrl}
                alt="user story"
                className="story-img"
              />
              <p className="user_name">{eachStory.userName}</p>
            </li>
          ))}
        </Slider>
      </ul>
    )
  }

  renderUserStories = () => {
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
    return (
      <div className="user_stories_container">{this.renderUserStories()}</div>
    )
  }
}

export default UserStories
