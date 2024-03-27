import React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import "../App.css"

const NavBar = () => {
    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = (e) => {
        setSearchQuery(e.target.value)
    }

    return (
        <div className="top-bar">
            <div className="logo group"> 
            <h2 className="title">Ticketly</h2> 
                </div>
                <div className="navbar">
                    <Link to="/" className="tab">Home</Link>
                    <Link to="/venue" className="tab">Venue</Link>
                    <Link to="/events" className="tab">Events</Link>
                    <Link to="/reviews" className="tab">Reviews</Link>
                </div>
                <div className="textfield">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleSearch}
                        className="text" 
                    />
                    <button className="search-button">Search</button>
                </div>
                
            </div>
        )
}

export default NavBar
