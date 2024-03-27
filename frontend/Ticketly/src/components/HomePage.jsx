import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../App.css'

const HomePage = () => {
    const [venueData, setVenueData] = useState([])
    const [eventData, setEventData] = useState([])
    const [reviewData, setReviewData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const venueResponse = await axios.get('http://localhost:8000/venues/')
                setVenueData(venueResponse.data)

                const eventResponse = await axios.get('http://localhost:8000/events/')
                setEventData(eventResponse.data)

                const reviewResponse = await axios.get('http://localhost:8000/reviews/')
                setReviewData(reviewResponse.data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [])

    const [searchTerm, setSearchTerm] = useState('')

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
    }

    const filteredVenues = venueData.filter(venue =>
        venue.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const filteredEvents = eventData.filter(event =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    const filteredReviews = reviewData.filter(review =>
        review.text.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div>
            <div className="header-container">
                <h1>Welcome to Ticketly</h1>
                <p>Search for venues, events, and reviews</p>
                <input type="text" placeholder="Search" value={searchTerm} onChange={handleSearch} />
            </div>
            <div className="venue-container">
                {filteredVenues.map(venue => (
                    <div key={venue.id}>
                        <h2>{venue.name}</h2>
                        <p>{venue.city}, {venue.state} {venue.zipcode}</p>
                        <p>{venue.street_address}</p>
                    </div>
                ))}
            </div>
            <div className="events-container">
                {filteredEvents.map((event) => (
                    <div key={event.id} className="event-container">
                        <h2>{event.name}</h2>
                        <p>Date: {event.date}</p>
                        <p>Time: {event.time}</p>
                        <p>Description: {event.description}</p>
                        <p>Performers: {event.performers.join(', ')}</p>
                        <div className="event-image">
                            <img src={event.img_url} alt={event.name} />
                        </div>
                    </div>
                ))}
            </div>
            <div className="review-container">
                {filteredReviews.map((review) => (
                    <div key={review.id} className="review">
                        <h2>{review.title}</h2>
                        <p>{review.text}</p>
                        <p>Rating: {review.rating}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomePage
