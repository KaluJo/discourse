import React, { useRef, useEffect, useState } from "react";
import {
  Flex,
  Text,
  Box,
  Button,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

import BackgroundWrapper from "../components/BackgroundWrapper";
import ProgressBar from "../components/ProgressBar";

const Video = () => {
  const { state } = useLocation();
  const { topic, videoUrl, videoUrl2, videoUrl3, videoUrl4 } = state;

  const [currentVideos, setCurrentVideos] = useState({ first: videoUrl, second: videoUrl2 });

  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);

  useEffect(() => {
    if (videoRef1.current) {
      const timer = setTimeout(() => {
        videoRef1.current.play();
      }, 2000);
  
      return () => clearTimeout(timer);
    }
  }, [currentVideos.first]);

  const handleFirstVideoEnd = () => {
    if (videoRef2.current) {
      videoRef2.current.play();
    }
  };

  const handleSecondVideoEnd = () => {
    if (currentVideos.first === videoUrl && currentVideos.second === videoUrl2) {
      setCurrentVideos({ first: videoUrl3, second: videoUrl4 });
    }
  };

  return (
    <BackgroundWrapper>
      <Text color="#EDFF7F" fontWeight={700} fontSize={40} pb={10}>
        Topic:{" "}
        <Box as="span" color="#FFFFFF">
          {topic}
        </Box>
      </Text>
      <Flex justify={"center"}>
        <video
          controls
          src={currentVideos.first}
          ref={videoRef1}
          onEnded={handleFirstVideoEnd}
          style={{ marginTop: '20px', width: '40%' }}
        />
        <video
          controls
          src={currentVideos.second}
          ref={videoRef2}
          onEnded={handleSecondVideoEnd}
          style={{ marginTop: '20px', width: '40%' }}
        />
      </Flex>
      <Box
        mt={5}
        _hover={{
          bg: "gray.700",
          cursor: "pointer",
        }}
      >
        <Button variant="unstyled" _hover={{ bg: "transparent" }}>
          <Text fontSize="sm">← Generate a new prompt</Text>
        </Button>
      </Box>
      <ProgressBar />
    </BackgroundWrapper>
  );
};

export default Video;