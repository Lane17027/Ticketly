import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const TicketsPage = () => {
    const [selectedSeats, setSelectedSeats] = useState(new Set())
    const [eventData, setEventData] = useState({})
    const [showTicket, setShowTicket] = useState(false)
    const { eventId } = useParams()

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/events/${eventId}`)
                setEventData(response.data);
            } catch (error) {
                console.error('Error fetching event data:', error)
            }
        };
        fetchEventData()
    }, [eventId])

    const handleSeatClick = (seatId) => {
        setSelectedSeats(prevSelectedSeats => {
            const newSelectedSeats = new Set(prevSelectedSeats)
            if (newSelectedSeats.has(seatId)) {
                newSelectedSeats.delete(seatId)
            } else {
                newSelectedSeats.add(seatId)
            }
            return newSelectedSeats;
        })
    }

    const renderSeats = () => {
        let seats = []
        for (let i = 0; i < 50; i++) {
            seats.push(
                <span key={i} className={`seat ${selectedSeats.has(i) ? 'selected' : ''}`} onClick={() => handleSeatClick(i)}>
                    🪑
                </span>
            )
        }
        return seats
    }

    const calculateTotal = () => selectedSeats.size * 20

    return (
        <div className="tickets-page">
            <h1>Select Your Seats for {eventData.name}</h1>
            <div className="seats-container">{renderSeats()}</div>
            <div className="stage">STAGE</div>
            {selectedSeats.size > 0 && (
                <button className="buy-tickets-btn" onClick={() => setShowTicket(true)}>
                    Buy Tickets - Total: ${calculateTotal()}
                </button>
            )}
            {showTicket && (
                <div className="purchase-confirmation">
                    <h2>Congratulations on Your Purchase!</h2>
                    <p>You have successfully purchased {selectedSeats.size} tickets!</p>
                    <p>Total Paid: ${calculateTotal()}</p>
                    <p>Event: {eventData.name}</p>
                    <p>Date and Time: {eventData.date} at {eventData.time}</p>
                </div>
            )}
        </div>
    )
}

export default TicketsPage
