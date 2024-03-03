import React from "react";
import { Box, Center, Text } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box w="100%" p={4} color="white">
      <Text fontSize="xl" fontWeight="bold" pl={5}>
        Discourse
      </Text>
    </Box>
  );
};

export default Header;
