import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ReviewsPage = () => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [rating, setRating] = useState(0)
    const [venueId, setVenueId] = useState('')
    const [eventId, setEventId] = useState('')
    const [reviews, setReviews] = useState([])
    const [editingId, setEditingId] = useState(null)

    useEffect(() => {
        fetchReviews()
    }, [])

    const fetchReviews = async () => {
        try {
            const response = await axios.get('http://localhost:8000/reviews/')
            setReviews(response.data)
        } catch (error) {
            console.error('Error fetching reviews:', error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const reviewData = { title, text, rating, venue: venueId, event: eventId }
        console.log(reviewData)
        try {
            if (editingId) {
                await axios.put(`http://localhost:8000/reviews/${editingId}/`, reviewData)
            } else {
                await axios.post('http://localhost:8000/reviews/', reviewData)
            }
            fetchReviews()
            setTitle('')
            setText('')
            setRating(0)
            setVenueId('')
            setEventId('')
            setEditingId(null)
        } catch (error) {
            console.error('Error submitting the reviews', error)
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/reviews/${id}/`)
            fetchReviews()
        } catch (error) {
            console.error('Error deleting the review:', error)
        }
    }

    const handleEdit = (review) => {
        setTitle(review.title)
        setText(review.text)
        setRating(review.rating)
        setVenueId(review.venue)
        setEventId(review.event)
        setEditingId(review.id)
    }

    return (
        <div>
            <h1>Review Page</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label htmlFor="text">Text:</label>
                <textarea
                    id="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>

                <label htmlFor="rating">Rating:</label>
                <input
                    type="number"
                    id="rating"
                    value={rating}
                    min={1}
                    max={5}
                    onChange={(e) => setRating(parseInt(e.target.value, 10))}
                />

                <label htmlFor='venueId'>Venue ID:</label>
                <input
                    type='text'
                    id='venueId'
                    value={venueId}
                    onChange={(e) => setVenueId(e.target.value)}
                />

                <label htmlFor='eventId'>Event ID:</label>
                <input
                    type='text'
                    id='eventId'
                    value={eventId}
                    onChange={(e) => setEventId(e.target.value)}
                />

                <button type="submit">Submit Review</button>
            </form>

            <div className="reviews-list">
                {reviews.map((review) => (
                    <div key={review.id} className="review">
                        <h2>{review.title}</h2>
                        <p>{review.text}</p>
                        <p>Rating: {review.rating}</p>
                        <button onClick={() => handleEdit(review)}>Edit</button>
                        <button onClick={() => handleDelete(review.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ReviewsPage