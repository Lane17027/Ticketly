import React, { useState } from 'react'

const ReviewsPage = () => {
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [rating, setRating] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault()
       
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
                    onChange={(e) => setRating(parseInt(e.target.value))}
                />

                <button type="submit">Submit Review</button>
            </form>
        </div>
    )
}
export default ReviewsPage