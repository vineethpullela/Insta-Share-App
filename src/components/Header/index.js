import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoCloseCircle} from 'react-icons/io5'

import './index.css'

class Header extends Component {
  state = {showMenu: false, showSearchBar: false}

  onClickMenu = () => {
    this.setState(prevState => ({showMenu: !prevState.showMenu}))
  }

  onClickShowSearch = () => {
    this.setState({showSearchBar: true})
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {showMenu, showSearchBar} = this.state
    return (
      <nav className="header-container">
        <div className="large_container">
          <div className="title_logo_container">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dj2tk6c0s/image/upload/v1692120364/insta%20share/Standard_Collection_8_xqlg4z.jpg"
                alt="home_logo"
                className="logo"
              />
            </Link>
            <h1 className="title">Insta Share</h1>
          </div>
          <div className="search_links_container">
            <div className="search_container">
              <input type="search" className="search_bar" />
              <button type="button" className="search_button">
                <FaSearch className="search_icon" />
              </button>
            </div>
            <ul className="nav_bar">
              <Link to="/" className="nav_item">
                <li>Home</li>
              </Link>
              <Link to="/profile" className="nav_item">
                <li>profile</li>
              </Link>
            </ul>
            <button
              type="button"
              className="logout_button"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="mobile_container">
          <div className="top_container">
            <div className="mobile_title_logo_container">
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/dj2tk6c0s/image/upload/v1692120364/insta%20share/Standard_Collection_8_xqlg4z.jpg"
                  alt="website_logo"
                  className="mobile_logo"
                />
              </Link>
              <h1 className="mobile_title">Insta Share</h1>
            </div>

            <button
              type="button"
              className="hamburger_icon_button"
              onClick={this.onClickMenu}
            >
              <GiHamburgerMenu size="20" />
            </button>
          </div>

          {showMenu && (
            <div className="mobile_nav_links">
              <ul className="nav_bar">
                <Link to="/" className="nav_item">
                  <li>Home</li>
                </Link>
                <Link to="/profile" className="nav_item">
                  <li>Profile</li>
                </Link>
                <li onClick={this.onClickShowSearch}>Search</li>
              </ul>
              <button type="button" className="logout_button">
                Logout
              </button>
              <button
                type="button"
                className="close_button"
                onClick={this.onClickMenu}
              >
                <IoCloseCircle size="25" />
              </button>
            </div>
          )}

          {showSearchBar && (
            <div className="search_div">
              <input type="search" className="search_bor" />
              <button type="button" className="search_button">
                <FaSearch size="15" className="search_icon" />
              </button>
            </div>
          )}
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
