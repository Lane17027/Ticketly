import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import HomePage from './components/HomePage.jsx'
import VenuePage from './components/VenuePage.jsx'
import EventsPage from './components/EventsPage.jsx'
import ReviewsPage from './components/ReviewsPage.jsx'
import TicketsPage from './components/TicketsPage.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />}>
                    <Route path="venue" element={<VenuePage />} />
                    <Route path="events" element={<EventsPage />} />
                    <Route path="reviews" element={<ReviewsPage />} />
                    <Route path="tickets/:eventId" element={<TicketsPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)
