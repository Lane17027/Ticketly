import React from 'react'

const NavBar = () => {
    return (
        <nav>
            <div className="logo">
                <img src="logo.png" alt="Logo" className="logo-image" />
                <span className="logo-text">Ticketly</span>
            </div>
            <ul className="nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="/venue">Venue</a></li>
                <li><a href="/events">Events</a></li>
                <li><a href="/reviews">Reviews</a></li>
            </ul>
            <div className="search-bar">
                <input type="text" placeholder="Search" />
                <i className="check-search"></i>
            </div>
        </nav>
    )
}

export default NavBar