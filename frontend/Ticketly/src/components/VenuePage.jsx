import React, { useEffect, useState } from 'react'
import axios from 'axios'

const VenuePage = () => {
    const [venues, setVenues] = useState([])
    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/venues')
                const data = await response.json()
                setVenues(data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchData()
    }, [])
    return (
        <div className="venue-page">
            {venues.map((venue) => (
                <div key={venue.id} className="venue-container">
                    <h2>{venue.name}</h2>
                    <p>City: {venue.city}</p>
                    <p>State: {venue.state}</p>
                    <p>Zipcode: {venue.zipcode}</p>
                    <p>Street Address: {venue.street_address}</p>
                    <div className="events-container">
                        {venue.events.slice(0, 3).map((event) => (
                            <div key={event.id} className="event">
                                <h3>{event.name}</h3>
                                {/* Render other event details */}
                            </div>
                        ))}
                    </div>
                    <div className="reviews-container">
                        {venue.reviews.map((review) => (
                            <div key={review.id} className="review">
                                <h3>{review.title}</h3>
                                <p>{review.text}</p>
                                {/* Render other review details */}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
export default VenuePage