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

    return (
        <div>
            <div className="venue-container">
                {venueData && venueData.map((venue) => (
                    <div key={venue.id}>
                        <h2>{venue.name}</h2>
                        <p>{venue.city}, {venue.state} {venue.zipcode}</p>
                        <p>{venue.streetAddress}</p>
                    </div>
                ))}
            </div>
            <div className="event-container">
                {eventData && eventData.map((event) => (
                    <div key={event.id}>
                        <h2>{event.name}</h2>
                        <p>Date: {event.date}</p>
                        <p>Time: {event.time}</p>
                        <p>Type: {event.type ? 'Sports' : 'Other'}</p>
                    </div>
                ))}
            </div>
            <div className="review-container">
                {reviewData && reviewData.map((review) => (
                    <div key={review.id}>
                        <h2>Review</h2>
                        <p>Venue: {review.venue}</p>
                        <p>Event: {review.event}</p>
                        <p>Text: {review.text}</p>
                        <p>Rating: {review.rating}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HomePage