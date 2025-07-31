import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Pages/LandingPage"
import NotFound from "./Pages/NotFound"
import BookingPage from "./Pages/BookingPage"


function App() {
  return (
    <BrowserRouter>
      <Routes>
         {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/book" element={<BookingPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
