
import { Container} from "@chakra-ui/react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import RestaurantsPage from "./pages/RestaurantsPage.tsx";
import RestaurantDetailPage from "./pages/RestaurantDetailPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import NewBookingPage from "./pages/NewBookingPage.tsx";

function App() {

  

  return (
    <Container maxW="7xl" >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/restaurants" element={<RestaurantsPage />} />
          <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />
          <Route path="/bookings/new" element={<NewBookingPage />} />
        </Routes>
      </BrowserRouter>
    </Container>
  )
}

export default App
