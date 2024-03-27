import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const TicketsPage = () => {
    const [selectedSeats, setSelectedSeats] = useState([])
    const [showTicket, setShowTicket] = useState(false)
    const [eventData, setEventData] = useState(null)
    const { eventId } = useParams()

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/events/${eventId}`)
                setEventData(response.data)
            } catch (error) {
                console.error('Error fetching event data:', error)
            }
        };
        fetchEventData()
    }, [eventId])

    const handleSeatClick = (seatIndex) => {
        const updatedSeats = selectedSeats.includes(seatIndex) 
            ? selectedSeats.filter(seat => seat !== seatIndex)
            : [...selectedSeats, seatIndex]
        setSelectedSeats(updatedSeats)
    }

    const handleBuyTickets = () => {
        setShowTicket(true)
    }

    const calculateTotal = () => {
        return selectedSeats.length * 20 
    }

    return (
        <div>
            <h1>Select Your Seats</h1>
            <div className="seats-container" style={{ textAlign: 'center' }}>
                {/* Top Row Seats */}
                <div>{Array.from({ length: 10 }, (_, seatIndex) => (
                    <span key={seatIndex} onClick={() => handleSeatClick(seatIndex)}
                        style={{
                            display: 'inline-block',
                            margin: '5px',
                            cursor: 'pointer',
                            color: selectedSeats.includes(seatIndex) ? 'red' : 'black',
                        }}>
                        🪑
                    </span>
                ))}
                </div>
  
                {/* Left and Right Seats by the Stage */}
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0 20%' }}>
                    <div>{Array.from({ length: 3 }, (_, seatIndex) => (
                        <span
                            key={seatIndex + 10}
                            onClick={() => handleSeatClick(seatIndex + 10)}
                            style={{
                                display: 'block', // Vertical layout
                                margin: '5px',
                                cursor: 'pointer',
                                color: selectedSeats.includes(seatIndex + 10) ? 'red' : 'black',
                            }}>
                            🪑
                        </span>
                    ))}
                    </div>
                    <div>{Array.from({ length: 3 }, (_, seatIndex) => (
                        <span
                            key={seatIndex + 13}
                            onClick={() => handleSeatClick(seatIndex + 13)}
                            style={{
                                display: 'block', // Vertical layout
                                margin: '5px',
                                cursor: 'pointer',
                                color: selectedSeats.includes(seatIndex + 13) ? 'red' : 'black',
                            }}>
                            🪑
                        </span>
                    ))}
                    </div>
                </div>

                {/* The Stage */}
                <div style={{ backgroundColor: '#ccc', padding: '20px', margin: '10px 15%', textAlign: 'center' }}>
                    STAGE
                </div>
  
                {/* Bottom Row Seats */}
                <div>{Array.from({ length: 10 }, (_, seatIndex) => (
                    <span key={seatIndex + 16} onClick={() => handleSeatClick(seatIndex + 16)}
                        style={{
                            display: 'inline-block',
                            margin: '5px',
                            cursor: 'pointer',
                            color: selectedSeats.includes(seatIndex + 16) ? 'red' : 'black',
                        }}>
                        🪑
                    </span>
                ))}
                </div>
            </div>
            {selectedSeats.length > 0 && (
                <button onClick={handleBuyTickets}>
                    Buy Tickets - Total: ${calculateTotal()} 🎟️
                </button>
            )}
            {showTicket && eventData && (
                <div>
                    <h2>Congratulations on Your Purchase! 🎉</h2>
                    <p>You have successfully purchased tickets for the event! </p>
                    <p>Total Paid: ${calculateTotal()}</p>
                    <p>Event Name: {eventData.name}</p>
                    <p>Date and Time: {`${eventData.date}, ${eventData.time}`}</p>
                </div>
            )}
        </div>
    )
}

export default TicketsPage
