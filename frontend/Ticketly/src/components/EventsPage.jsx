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
        }
        fetchData()
    }, [])
    
    return (
        <div className="events-page">
            {events.map((event) => (
                <div key={event.id} className="event-container">
                    <h2>{event.name}</h2>
                    <p>Date: {event.date}</p>
                    <p>Time: {event.time}</p>
                    <p>Description: {event.description}</p>
                    <p>Performers: {event.performers.join(', ')}</p>
                    <img src={event.img_url} alt={event.name} />
                    <Link to={`/tickets/${event.id}`}>
                        <button>Ticket</button>
                    </Link>
                </div>
            ))}
        </div>
    )
}
export default EventsPage