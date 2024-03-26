import React, { useState, useEffect } from 'react'
import { ReactComponent as MaterialSymbolsChair } from '../assets/material-symbols-chair.svg'

const TicketsPage = () => {
    const [selectedSeats, setSelectedSeats] = useState([])
    const [showTicket, setShowTicket] = useState(false)
    const [eventData, setEventData] = useState(null) // Add state for event data
    
    useEffect(() => {
        fetchEventData()
    }, [])
    
    const fetchEventData = async () => {
        try {
            const response = await fetch('https://api.example.com/events/1') 
            const data = await response.json()
            setEventData(data)
        } catch (error) {
            console.error('Error fetching event data:', error)
        }
    }
    
    const handleSeatClick = (seatIndex) => {
        if (selectedSeats.includes(seatIndex)) {
            setSelectedSeats(selectedSeats.filter(seat => seat !== seatIndex))
        } else {
            if (selectedSeats.length < 2) {
                setSelectedSeats([...selectedSeats, seatIndex])
            }
        }
    };
    
    const calculateTotal = () => {
        return selectedSeats.length * 5
    }
    
    const handleBuyTickets = () => {
        setShowTicket(true)
    }
    
    return (
        <div>
            <div>
                {Array.from({ length: 5 }, (_, rowIndex) => (
                    <div key={rowIndex}>
                        {Array.from({ length: 6 }, (_, seatIndex) => (
                            <div
                                key={seatIndex}
                                onClick={() => handleSeatClick(seatIndex)}
                                style={{
                                    display: 'inline-block',
                                    margin: '5px',
                                    cursor: 'pointer',
                                    color: selectedSeats.includes(seatIndex) ? 'red' : 'black'
                                }}
                            >
                                <MaterialSymbolsChair />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div>
                {selectedSeats.length > 0 && (
                    <button onClick={handleBuyTickets}>
                        Total: ${calculateTotal()}
                    </button>
                )}
            </div>
            {showTicket && eventData && (
                <div>
                    <h2>Congrats! Here is your ticket:</h2>
                    <p>Event Name: {eventData.name}</p>
                    <p>Venue Location: {eventData.location}</p>
                    <p>Time and Date: {eventData.dateTime}</p>
                </div>
            )}
        </div>
    )
}

export default TicketsPage