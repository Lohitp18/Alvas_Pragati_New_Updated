"use client"

import { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Header from "./components/Header"
import HeroPage from "./components/HeroPage"
import Footer from "./components/Footer"
import ChatBot from "./components/ChatBot"
import FloatingChatButton from "./components/FloatingChatButton"
import Logistics from "./pages/Logistics"
import Manufacture from "./pages/Manufacture"
import Banking from "./pages/Banking"
import Construction from "./pages/Contstruction"
import Education from "./pages/Education"
import Healthcare from "./pages/Healthcare"
import Hospital from "./pages/Hospital"
import IT from "./pages/It"
import ITES from "./pages/Ites"
import Media from "./pages/Media"
import Pharamautecals from "./pages/Pharamaeticals"
import Retail from "./pages/Retailandsales"
import Telecom from "./pages/Telecom"
import Admin from "./pages/AdminPanel";

export default function App() {
  const [activeSection, setActiveSection] = useState("home")
  const [isChatBotOpen, setIsChatBotOpen] = useState(false)

  const handleSelectSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const handleOpenChatBot = () => setIsChatBotOpen(true)
  const handleCloseChatBot = () => setIsChatBotOpen(false)

  return (
    <Router>
      <div className="min-h-screen">
        <Header onSelectSection={handleSelectSection} />
        <FloatingChatButton onClick={handleOpenChatBot} />

        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/manufacture" element={<Manufacture />} />
          <Route path="/banking" element={<Banking />} />
          <Route path="/construction" element={<Construction />} />
          <Route path="/education" element={<Education />} />
          <Route path="/healthcare" element={<Healthcare />} />
          <Route path="/hospital" element={<Hospital />} />
          <Route path="/it-ites" element={<IT />} />
          <Route path="/ites" element={<ITES />} />
          <Route path="/media" element={<Media />} />
          <Route path="/pharamautecals" element={<Pharamautecals />} />
          <Route path="/retail" element={<Retail />} />
          <Route path="/telecom" element={<Telecom />} />
          <Route path="/logistics" element={<Logistics />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>

        <Footer />
        <ChatBot isOpen={isChatBotOpen} onClose={handleCloseChatBot} />
      </div>
    </Router>
  )
}
