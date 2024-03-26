import Header from "./Header"
import Footer from "./Footer"
import HomePage from "./HomePage"
import React from 'react'
import VenuePage from './VenuePage'
import EventsPage from './EventsPage'

export default function Main(){
    return(
        <div>
            <Header />
            <HomePage />
            <VenuePage />
            <EventsPage />
            <Footer />
        </div>
    )
}
