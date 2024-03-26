import React, { useEffect, useState } from 'react'
import axios from 'axios'

const HomePage = () => {
    const [venueData, setVenueData] = useState(null)
    const [eventData, setEventData] = useState(null)
    const [reviewData, setReviewData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const venueResponse = await axios.get('venue-api-endpoint')
                setVenueData(venueResponse.data)

                const eventResponse = await axios.get('event-api-endpoint')
                setEventData(eventResponse.data)

                const reviewResponse = await axios.get('review-api-endpoint')
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

    const filteredVenues = venueData && venueData.filter((venue) => {
        return venue.name.toLowerCase().includes(searchTerm.toLowerCase())
    })

    const filteredEvents = eventData && eventData.filter((event) => {
        return event.name.toLowerCase().includes(searchTerm.toLowerCase())
    })

    const filteredReviews = reviewData && reviewData.filter((review) => {
        return review.text.toLowerCase().includes(searchTerm.toLowerCase())
    })

    return (
        <div>
            <div className="header-container">
                <h1>Welcome to Ticketly</h1>
                <p>Search for venues, events, and reviews</p>
                <input type="text" placeholder="Search" value={searchTerm} onChange={handleSearch} />
            </div>
            <div className="venue-container">
                {filteredVenues && filteredVenues.map((venue) => (
                    <div key={venue.id}>
                        <h2>{venue.name}</h2>
                        <p>{venue.city}, {venue.state} {venue.zipcode}</p>
                        <p>{venue.streetAddress}</p>
                        <button onClick={() => handleVenueClick(venue.id)}>Go to Venue</button>
                    </div>
                ))}
            </div>
            <div className="event-container">
                {filteredEvents && filteredEvents.map((event) => (
                    <div key={event.id}>
                        <h2>{event.name}</h2>
                        <p>Date: {event.date}</p>
                        <p>Time: {event.time}</p>
                        <p>Type: {event.type ? 'Sports' : 'Other'}</p>
                        <button onClick={() => handleEventClick(event.id)}>Go to Event</button>
                    </div>
                ))}
            </div>
            <div className="review-container">
                {filteredReviews && filteredReviews.map((review) => (
                    <div key={review.id}>
                        <h2>Review</h2>
                        <p>Venue: {review.venue}</p>
                        <p>Event: {review.event}</p>
                        <p>Text: {review.text}</p>
                        <p>Rating: {review.rating}</p>
                        <button onClick={() => handleReviewClick(review.id)}>Go to Review</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomePage