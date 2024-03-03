import React, { useRef, useEffect } from "react";
import {
  Flex,
  Text,
  Heading,
  Box,
  Input,
  Button,
  Center,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

import BackgroundWrapper from "../components/BackgroundWrapper";

const Video = () => {
  const { state } = useLocation();
  const { topic, videoUrl, videoUrl2 } = state;

  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);

  useEffect(() => {
    if (videoRef1.current) {
      videoRef1.current.play();
    }
  }, []);

  const handleFirstVideoEnd = () => {
    if (videoRef2.current) {
      videoRef2.current.play();
    }
  };

  console.log(videoUrl);

  console.log(videoUrl2);

  return (
    <BackgroundWrapper>
      <Text color="#EDFF7F" fontWeight={700} fontSize={40} pb={10}>
        Topic:{" "}
        <Box as="span" color="#FFFFFF">
          {topic}
        </Box>
      </Text>
      <Box
          // border="1px"
          borderColor="white"
          borderStyle="solid"
          borderRadius="lg"
          p={0}
        >
      <Flex justify={"center"}>
        {videoUrl && (
          <video
            controls
            src={videoUrl}
            ref={videoRef1}
            onEnded={handleFirstVideoEnd}
            style={{ marginTop: '20px', width: '40%' }}
          />
        )}
        {videoUrl2 && (
          <video
            controls
            src={videoUrl2}
            ref={videoRef2}
            style={{ marginTop: '20px', width: '40%', display: 'none' }} // Initially hide the second video
          />
        )}
      </Flex>
      </Box>
      <Box
        border="1px"
        borderColor="white"
        borderStyle="solid"
        px={5}
        mt={5}
        borderRadius="5rem"
        _hover={{
          bg: "gray.700",
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

export default Video;
