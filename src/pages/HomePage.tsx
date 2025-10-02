import {
  Button,
  Heading,
  HStack,
  Separator,
  Flex,
  Box,
  Image,
  Text
} from "@chakra-ui/react"

import { toaster } from "../components/ui/toaster"
import { RestaurantApi } from "../models/api_restaurant"
import { useState } from "react";
import * as token_repository from '../models/token_repository';
import { useNavigate } from "react-router-dom";

export default function HomePage() {

  // Use React state for form values instead of direct DOM access

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // on form submit, show a message with toast
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    const params = {
      username: username,
      password: password,
    };
    try {
      const jsonResponse = await RestaurantApi.post("/login", params);
      if (jsonResponse === undefined) {
        return;
      }

      if ("token" in jsonResponse) {
        token_repository.setToken(jsonResponse.token);
        // go to /restaurants url
        navigate("/restaurants");
      } else {
        toaster.create({
          title: "Error.",
          description: jsonResponse.message || "Invalid login credentials.",
        });
        setPassword("");
        setUsername("");
      }

    } catch (error: any) {
      console.error("Login error:", error);
      toaster.create({
        title: "Error.",
        description: "An error occurred during login.: " + error.message,
      });
    }
  };


  return (
    <>
      <Flex direction="column" align="center" justify="space-between" minH="100vh" bg="gray.50" p={4} gap={6}>
        <Box as="header" textAlign="center" mb={5}>
          <Heading
            size="6xl"
            fontWeight="bold"
            letterSpacing="wide"
            lineHeight="short"
            color="teal.600"
            mb={1}
            fontFamily="'Playfair Display', serif"
          >
            Welcome to Fine Dining
          </Heading>
          <Text
            fontSize="lg"
            color="gray.600"
            fontWeight="medium"
            fontFamily="'Playfair Display', serif"
          >
            Explore the best restaurants and reserve your table effortlessly.
          </Text>

          <Separator width="500px" marginTop={15} marginX="auto" />

        </Box>

        <Flex
          bg="white"
          boxShadow="md"
          borderRadius="md"
          p={0}
          mt={30}

        >
          <Box flex="1" display="flex" alignItems="center" justifyContent="center" p={8}>
            <Image
              src="/restaurant.webp"
              alt="Restaurant's picture"
              style={{ maxWidth: "100%", maxHeight: "350px", borderRadius: "12px", objectFit: "cover" }}
            />
          </Box>

          <Separator orientation="vertical" />

          {/* Right: Login Form */}
          <Box flex="1" p={8} display="flex" alignItems="center" justifyContent="center">
            <Box width="100%" maxW="350px">
              <Heading as="h2" size="md" mb={6} textAlign="center">
                Login
              </Heading>
              <form onSubmit={handleSubmit}>
                <HStack gap={4} mb={4}>
                  <span style={{ color: "#718096", fontSize: "20px" }}>
                    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
                      <path d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6zm2 0l8 7 8-7H4zm16 2.236-7.447 6.52a2 2 0 0 1-2.106 0L4 8.236V18h16V8.236z" fill="#718096" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Username"
                    id="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "6px",
                      border: "1px solid #E2E8F0",
                      fontSize: "16px"
                    }}
                  />
                </HStack>
                <HStack gap={4} mb={6}>
                  <span style={{ color: "#718096", fontSize: "20px" }}>
                    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
                      <path d="M17 11V7a5 5 0 0 0-10 0v4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2zm-8-4a3 3 0 0 1 6 0v4H9V7zm8 12H7v-6h10v6z" fill="#718096" />
                    </svg>
                  </span>
                  <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "6px",
                      border: "1px solid #E2E8F0",
                      fontSize: "16px"
                    }}
                  />
                </HStack>
                <Button colorScheme="teal" width="100%" type="submit">
                  Enter
                </Button>
              </form>
            </Box>
          </Box>
        </Flex>

        {/* Footer */}
        <Box
          alignContent={"end"}
          textAlign={"center"}
          flex="1"
          justifyContent="bottom"
        >
          <Separator width="500px" />
          <footer style={{ color: "#718096", fontSize: "14px", paddingTop: "15px" }}>
            &copy; {new Date().getFullYear()} Book your restaurant, all rights reserved.
          </footer>
        </Box>
      </Flex>

    </>
  );
}