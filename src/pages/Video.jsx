import React from "react";
import {
  Flex,
  Text,
  Heading,
  Box,
  Input,
  Button,
  Center,
} from "@chakra-ui/react";

import BackgroundWrapper from "../components/BackgroundWrapper";

const Main = () => {
  return (
    <BackgroundWrapper>
      <Text pb={10}>
        Topic:{" "}
        <Box as="span" color="#EDFF7F">
          [prompt] Is pineapple on pizza acceptable?
        </Box>
      </Text>
      <Box
        border="1px"
        borderColor="white"
        borderStyle="solid"
        borderRadius="lg"
        p={5}
      >
        Video
      </Box>
      <Box
        border="1px"
        borderColor="white"
        borderStyle="solid"
        px={5}
        mt={5}
        borderRadius="5rem"
        _hover={{
          bg: "gray.700", // Change to your preferred hover background color
          cursor: "pointer",
        }}
      >
        <Button
          variant="unstyled"
          _hover={{
            bg: "transparent",
          }}
        >
          <Text fontSize="sm">← Generate a new prompt</Text>
        </Button>
      </Box>
    </BackgroundWrapper>
  );
};

export default Main;
