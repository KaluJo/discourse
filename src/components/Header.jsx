import React from 'react';
import { Box, Center, Text } from '@chakra-ui/react';

const Header = () => {
    return (
        <Box bg="blue.500" w="100%" p={4} color="white">
            <Center>
                <Text fontSize="xl" fontWeight="bold">Discourse Header</Text>
            </Center>
        </Box>
    );
};

export default Header;