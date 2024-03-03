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
import Header from "../components/Header";
import BackgroundWrapper from "../components/BackgroundWrapper";

const Main = () => {
  return (
    <BackgroundWrapper>
      <Flex direction="column" justify="center" align="center" flex={1} pb={20}>
        {/* <Flex
          flex={1}
          justify="center"
          align="center"
          direction="column"
          bg="gray.100"
        > */}{" "}
        <Heading>Sharpen Minds, Shape Opinions.</Heading>
        <Heading>
          The{" "}
          <Box as="span" color="#EDFF7F">
            Future
          </Box>{" "}
          of Debate is Here.
        </Heading>
        <Text fontSize="2xl" mt={5} mb={5}>
          Spark a debate. Enter your topic below.
        </Text>
        <Flex>
          <Input
            _placeholder={{ fontSize: "sm" }}
            placeholder='Example: "Is pineapple on pizza acceptable?"'
            w="20rem"
            borderRadius="20px"
          ></Input>
          <Button ml={5} borderRadius="20px" bg="#EDFF7F">
            →
          </Button>
        </Flex>
      </Flex>
    </BackgroundWrapper>
  );
};

export default Main;
