import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './components/HomePage.jsx'
import VenuePage from './components/VenuePage.jsx'
import EventsPage from './components/EventsPage.jsx'
import ReviewsPage from './components/ReviewsPage.jsx'
import TicketsPage from './components/TicketsPage.jsx'
import NavBar from './components/NavBar.jsx'

const App = () => (
    <div>
        <NavBar /> 
        <Routes>
            <Route path="/" element={<HomePage />} /> 
            <Route path="/venue" element={<VenuePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/tickets/:eventId" element={<TicketsPage />} />
        </Routes>
    </div>
)

export default App
