import React, { useEffect, useState } from 'react'
import axios from 'axios'

const VenuePage = () => {
    const [venues, setVenues] = useState([])

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const response = await axios.get('http://localhost:8000/venues/')
                setVenues(response.data);
            } catch (error) {
                console.error('Error fetching venue data:', error)
            }
        }
        fetchVenues()
    }, [])

    return (
            <div>
            <div className="events-header-container">
                <h1>Our Venues</h1>
                <p>Discover venues for all types of events</p>
            </div>
            <div className="section"> 
            <div className="title">Venues</div>
                {venues.map((venue, index) => (
                    <div key={venue.id} className={`item item-${index + 1}`}>
                         <div className="frame">
                            <img src={venue.img_url} alt={venue.name} className="icon" />
                        </div>
                        <div className="div"> 
                        <h2 className="text-wrapper">{venue.name}</h2> 
                        
                            <div className="subtitle">{venue.city}, {venue.state} {venue.postalCode}</div> 
                            <div className="subtitle">{venue.street_address}</div> 
                        </div>
                        <button onClick={() => `/venues/${venue.id}`} className="primary">
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default VenuePage