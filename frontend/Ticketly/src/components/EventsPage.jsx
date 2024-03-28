import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const EventsPage = () => {
    const [events, setEvents] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/events/')
                setEvents(response.data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        };
        fetchData()
    }, [])
    function formatTime(time) {
        const [hours, minutes] = time.split(':')
        const formattedHours = parseInt(hours) % 12 || 12
        const formattedMinutes = parseInt(minutes)
        const period = parseInt(hours) >= 12 ? 'pm' : 'am'
        return `${formattedHours}:${formattedMinutes.toString().padStart(2, '0')}${period} est`
    }

    return (
        <div>
            <div className="events-header-container">
                <h1>Upcoming Events</h1>
                <p>Discover events and buy tickets</p>
            </div>

            <div className="section">
                <div className="title">Events</div>
                {events.map((event, index) => (
                    <div key={event.id} className={`item item-${index + 1}`}>
                        <div className="frame">
                            <img src={event.img_url} alt={event.name} className="icon" />
                        </div>
                        <div className="div">
                            <div className="text-wrapper">{event.name}</div>
                            <div className="subtitle">Date: {event.date}</div>
                            <div className="subtitle">Time: {formatTime(event.time)}</div>
                            <div className="subtitle-2">Description: {event.description}</div>
                            <div className="subtitle">Performers: {event.performers.join(', ')}</div>
                        </div>
                        <Link to={`/tickets/${event.id}`}>
                            <button className="primary">Ticket</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EventsPage
