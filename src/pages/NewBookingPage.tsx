import * as user_repository from '../models/user_repository';
import * as restaurant_repository from '../models/reataurant_repository';
import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text
} from "@chakra-ui/react";

import Header from "../components/header";
import { useNavigate } from "react-router-dom";
import { toaster } from "../components/ui/toaster"


export default function RestaurantsPage() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUser = async () => {
      const usuario = await user_repository.getCurrentUser();
      setUser(usuario);
      console.log("Usuario cargado:", usuario);
    };
    fetchUser();


  }, []);

  const sendBooking = async () => {
    // get form values
    const form = document.querySelector("form");
    if (!form) {
      return;
    }
    const formData = new FormData(form);
    const datetime = formData.get("datetime") as string;
    const people = formData.get("people") as string;
    const name = formData.get("name") as string;

    const params = {
      // format YYYY-mm-dd hh:mm
      date: datetime.replace("T", " "),
      persons: parseInt(people),
      name: name,
    };

    try {
      const response = await restaurant_repository.createBooking(params);
      if (response && "status" in response && response.status === "OK") {
        navigate("/restaurants");
      } else {
        console.error("Error creating booking:", response);
        toaster.create({
                  title: "Error creating booking.",
          description: response.message || "Unknown error",
        });
      }
    } catch (error: any) {
      console.error("Error creating booking:", error);
      toaster.create({
        title: "Error creating booking.",
        description: error.message || "Unknown error",
      });
    }
  };

  return (
    <>
      <Box p={8}>
        <Header user={user} />

        <Heading mb={6}>New Booking:</Heading>

        <Box
          as="form"
          maxW="md"
          display="flex"
          flexDirection="column"
          gap={6}
        >
          <Box>
            <Text mb={1} fontWeight="semibold">
              Date and Time
            </Text>
            <input
              type="datetime-local"
              name="datetime"
              required

              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #CBD5E0",
              }}
            />
          </Box>
          <Box>
            <Text mb={1} fontWeight="semibold">
              Number of People
            </Text>
            <input
              type="number"
              name="people"
              min={1}
              max={20}
              required
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #CBD5E0",
              }}
            />
          </Box>
          <Box>
            <Text mb={1} fontWeight="semibold">
              Name
            </Text>
            <input
              type="text"
              name="name"
              required
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #CBD5E0",
              }}
            />
          </Box>

          <Box mt={4}>
            <button
              type="button"
              onClick={() => sendBooking()}
              style={{
                width: "100%",
                padding: "10px",
                background: "#3182CE",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontWeight: "bold",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Book
            </button>
          </Box>
        </Box>

      </Box>
    </>
  );
}