import {
    Heading,
    Flex,
    Input,
    Avatar,
    Button,
    Spacer,
    Image,
    Box
} from "@chakra-ui/react";
import * as user_repository from '../models/user_repository';
import { Tooltip } from "./ui/tooltip";

export default function Header({ user }: { user: any }) {

    const handleLogout = async () => {
        await user_repository.logout();
    };

    return (
        <Flex
            align="center"
            bg="teal.600"
            color="white"
            px={8}
            py={4}
            mb={8}
            borderRadius="md"
        >
            <Heading size="md">
                <Image
                    src="/logo2.webp"
                    alt="Logo"
                    style={{ backgroundColor: "white", maxWidth: "100%", maxHeight: "100px", borderRadius: "12px", objectFit: "cover", border: "2px solid black" }}
                />
            </Heading>
            <Spacer />
            <Input
                placeholder="Search..."
                maxW="300px"
                bg="white"
                color="black"
                mr={4}
            />
            {user ? (
                <Flex align="center" gap={3}>
                    <Tooltip showArrow content={user.name}>
                        <Box>
                            <Avatar.Root>
                                <Avatar.Fallback name={user.name} />
                            </Avatar.Root>
                        </Box>
                    </Tooltip>
                    <Button size="sm" colorScheme="teal" onClick={handleLogout}>
                        Logout
                    </Button>
                </Flex>
            ) : null}
        </Flex>
    );
}