import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ReviewsPage = () => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [rating, setRating] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const [reviews, setReviews] = useState([])

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get('http://localhost:8000/reviews/')
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error)
            }
        }

        fetchReviews()
    }, [])

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

                <button type="submit">Submit Review</button>
            </form>

            <div className="reviews-list">
                {reviews.map((review) => (
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

export default ReviewsPage