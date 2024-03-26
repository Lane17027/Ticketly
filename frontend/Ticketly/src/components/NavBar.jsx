import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

    const NavBar = () => {
        const [searchQuery, setSearchQuery] = useState('')

        const handleSearch = (e) => {
            setSearchQuery(e.target.value)
        }

        return (
            <nav>
                <div className="logo">
                    <img src="logo.png" alt="Logo" className="logo-image" />
                    <span className="logo-text">Ticketly</span>
                </div>
                <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/venue">Venue</Link></li>
                <li><Link to="/events">Events</Link></li>
                <li><Link to="/reviews">Reviews</Link></li>
                </ul>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <i className="check-search"></i>
                </div>
            </nav>
        )
    }

export default NavBar