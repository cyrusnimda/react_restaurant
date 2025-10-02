import * as user_repository from '../models/user_repository';
import * as restaurant_repository from '../models/reataurant_repository';
import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";

import Header from "../components/header";
import { Link } from 'react-router-dom';

export default function RestaurantsPage() {
  const [user, setUser] = useState<any>(null);
  const [restaurants, setRestaurants] = useState<any[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      const usuario = await user_repository.getCurrentUser();
      setUser(usuario);
      console.log("Usuario cargado:", usuario);
    };
    fetchUser();

    const fetchRestaurants = async () => {
      const restaurantes = await restaurant_repository.getAll();
      setRestaurants(restaurantes);
      console.log("Restaurantes cargados:", restaurantes);
    };
    fetchRestaurants();

  }, []);

  const handleLogout = async () => {
    await user_repository.logout();
    setUser(null);
  };

  return (
    <Box p={8}>
      <Header user={user} onLogout={handleLogout} />
      <Text mb={6}>Lista de restaurantes disponibles:</Text>
      <SimpleGrid columns={{ base: 1, md: 3 }} gap={2}>
        {restaurants.map((restaurante) => (
          <Link key={restaurante.id} to={`/restaurants/${restaurante.id}`}>
            <Box
              key={restaurante.id}
              borderWidth="1px"
              borderRadius="lg"
              p={6}
              boxShadow="md"
              bg="teal.50"
            >
              <Heading size="md" color="teal.700" mb={2}>
                {restaurante.name}
              </Heading>
              <Text color="teal.600">{restaurante.cuisine}</Text>
            </Box>
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
}