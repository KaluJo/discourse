import React, { useState, useEffect } from "react";
import {
  Flex,
  Text,
  Heading,
  Box,
  Input,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import BackgroundWrapper from "../components/BackgroundWrapper";
import { generateResponse } from "../api/api";

const Main = () => {
  const [topic, setTopic] = useState("");
  const navigate = useNavigate();

  const [videoUrl, setVideoUrl] = useState('');
  const [videoUrl2, setVideoUrl2] = useState('');

  const [videoReady, setVideoReady] = useState(false);
  const [videoOneReady, setVideoOneReady] = useState(false);
  const [videoTwoReady, setVideoTwoReady] = useState(false);

  const handleNextClick = async () => {
    setVideoReady(false);
    await generateResponse(topic, setVideoUrl, setVideoUrl2, setVideoOneReady, setVideoTwoReady);
    if (videoReady) {
      navigate("/video", { state: { topic, videoUrl, videoUrl2 } });
    }
  };

  useEffect(() => {
    if (videoOneReady && videoTwoReady) {
      navigate("/video", { state: { topic, videoUrl, videoUrl2 } });
    }
  }, [videoOneReady, videoTwoReady]);

  return (
    <BackgroundWrapper>
      <Flex direction="column" justify="center" align="center" flex={1} pb={20}>
        <Heading>Sharpen Minds, Shape Opinions.</Heading>
        <Heading>
          The <Box as="span" color="#EDFF7F">Future</Box> of Debate is Here.
        </Heading>
        <Text fontSize="2xl" mt={5} mb={5}>
          Spark a debate. Enter your topic below.
        </Text>
        <Flex>
          <Input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder='Example: "Is pineapple on pizza acceptable?"'
            w="20rem"
            borderRadius="20px"
          />
          <Button onClick={handleNextClick} ml={5} borderRadius="20px" bg="#EDFF7F">
            →
          </Button>
        </Flex>
      </Flex>
    </BackgroundWrapper>
  );
};

export default Main;

// import React, { useState } from 'react';
// import { Flex, Text, Button } from "@chakra-ui/react";
// import Header from './Header';
// import { generateAvatar, generateResponse } from '../api/api';

// const Main = () => {
//     const [videoUrl, setVideoUrl] = useState('');
//     const [videoUrl2, setVideoUrl2] = useState('');

//     return (
//         <Flex direction='column'>
//             <Header />
//             <Button onClick={() => generateResponse("Is pineapple on pizza acceptable?", setVideoUrl, setVideoUrl2)}>Click me to test gemini</Button>
//             <Button onClick={() => generateAvatar("Is pineapple on pizza acceptable?", setVideoUrl, setVideoUrl2)}>Click me to test heygen</Button>
//             {videoUrl && <video controls src={videoUrl} style={{ marginTop: '20px' }} />}
//             {videoUrl2 && <video controls src={videoUrl2} style={{ marginTop: '20px' }} />}
//         </Flex>
//     );
// };

// export default Main;