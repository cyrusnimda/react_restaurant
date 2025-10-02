import * as user_repository from '../models/user_repository';
import * as restaurant_repository from '../models/reataurant_repository';
import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  Flex,
  Table,
  Button,
  Input,
} from "@chakra-ui/react";

import Header from "../components/header";
import { Link, useParams } from 'react-router-dom';
import { Tooltip } from '../components/ui/tooltip';

export default function RestaurantDetailPage() {
  const [user, setUser] = useState<any>(null);
  const [restaurant, setRestaurant] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [tables, setTables] = useState<any[]>([]);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchUser = async () => {
      const usuario = await user_repository.getCurrentUser();
      setUser(usuario);
    };
    fetchUser();

    const fetchRestaurant = async () => {
      const restaurant = await restaurant_repository.getById(parseInt(id));
      setRestaurant(restaurant);
    };
    fetchRestaurant();

    const fetchBookings = async () => {
      const response = await restaurant_repository.getTodayBookings();
      setBookings(Array.isArray(response.bookings) ? response.bookings : []);
      console.log("Reservas cargadas:", response.bookings);
    };
    fetchBookings();


    const fetchTables = async () => {
      const tables = await restaurant_repository.getAllTables();
      setTables(Array.isArray(tables) ? tables : []);
    };
    fetchTables();
  }, []);

  const BOOKING_HOURS = [
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '19:00', '19:30', '20:00', '20:30', '21:00', '21:30',
    '22:00'
  ]




  return (
    <>
      <Box p={8}>
        <Header user={user} />
        <Text mb={6}>Restaurant details:</Text>
        <Flex gap={6} mb={6} flexDirection={{ base: "column", md: "row" }}>
          <Box flex="1">
            {restaurant ? (
              <Box
                borderWidth="1px"
                borderRadius="lg"
                p={6}
                boxShadow="md"
                bg="teal.50"
              >
                <Heading size="md" color="teal.700" mb={2}>
                  {restaurant.name}
                </Heading>
                <Text color="teal.600">{restaurant.cuisine}</Text>
                <Text color="teal.600">Dirección: {restaurant.address}</Text>
                <Text color="teal.600">Teléfono: {restaurant.phone}</Text>
                <Box mt={4}>
                  <Heading size="sm" mb={2}>Reviews: {restaurant.review_count}</Heading>
                  {restaurant.reviews_average !== undefined && (
                    <Box mb={4}>
                      <Text>
                        Rating:{" "}
                        {Array.from({ length: Math.floor(restaurant.reviews_average) }, (_, i) => (
                          <span key={i} style={{ color: "#FFD700", fontSize: "1.2em" }}>★</span>
                        ))}
                        {Array.from({ length: 5 - Math.floor(restaurant.reviews_average) }, (_, i) => (
                          <span key={i + 5} style={{ color: "#E2E8F0", fontSize: "1.2em" }}>★</span>
                        ))}
                      </Text>
                    </Box>
                  )}
                </Box>
              </Box>

            ) : (
              <Text>Cargando...</Text>
            )}
          </Box>
          <Box 
            flex="1" 
            borderWidth="1px"
            borderRadius="lg"
            p={6}
            boxShadow="md"
            bg="teal.50"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Image
              src="/restaurant_inside.jpeg"
              alt="Restaurant's picture"
              style={{ height: "100%", maxHeight: "180px", borderRadius: "12px", objectFit: "cover" }}
            />
          </Box>
        </Flex>


        {/* show booking table for today */}
        <Box>
          <Flex my={5} justifyContent="space-between" alignItems="center">
            <Text>Today's Bookings: {bookings.length}</Text>
            <Text>Tables: {tables.length}</Text>
            <Link color="teal.500" fontWeight="semibold" to="/bookings/new">
              <Button colorScheme="teal" size="sm">
                New Booking
              </Button>
            </Link>
          </Flex>

            <Box my={5} textAlign={"right"}>
            <Input
              name='date'
              type="date"
              bg="white"
              width={"200px"}

            />
            </Box>


          <Table.Root colorScheme="teal" size="md" variant="outline" striped interactive stickyHeader showColumnBorder >
            <Table.Header>
              <Table.Row bg="teal.100">
                <Table.ColumnHeader>Time</Table.ColumnHeader>
                {tables.map(table => (
                  <Table.ColumnHeader key={table.id} textAlign={"center"}>
                      <Box>
                        <big>Table {table.id}</big>
                      </Box>
                      <Box>
                        <small>(Seats: {table.seats})</small>
                      </Box>
                  </Table.ColumnHeader>
                ))}

              </Table.Row>
            </Table.Header>
            <Table.Body>
              {BOOKING_HOURS.map((hour) => {
                return (
                  <Table.Row key={hour}>
                    <Table.Cell>{hour}</Table.Cell>
                    {tables.map(table => {
                      const booking = restaurant_repository.isTableBooking(bookings, hour, table.id);
                      return (
                        <Table.Cell textAlign="center" key={table.id}>
                          {booking ? <Tooltip showArrow content={booking.name}><Text>✖️</Text></Tooltip> : ""}
                        </Table.Cell>
                      );
                    })}
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Root>
        </Box>
      </Box>

    </>
  );
}