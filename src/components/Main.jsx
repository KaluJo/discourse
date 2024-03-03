import React, { useState } from 'react';
import { Flex, Text, Button } from "@chakra-ui/react";
import Header from './Header';
import { generateAvatar, generateResponse } from '../api/api';

const Main = () => {
    const [videoUrl, setVideoUrl] = useState('');
    const [videoUrl2, setVideoUrl2] = useState('');

    return (
        <Flex direction='column'>
            <Header />
            <Button onClick={() => generateResponse("Is pineapple on pizza acceptable?", setVideoUrl, setVideoUrl2)}>Click me to test gemini</Button>
            <Button onClick={() => generateAvatar("Is pineapple on pizza acceptable?", setVideoUrl, setVideoUrl2)}>Click me to test heygen</Button>
            {videoUrl && <video controls src={videoUrl} style={{ marginTop: '20px' }} />}
            {videoUrl2 && <video controls src={videoUrl2} style={{ marginTop: '20px' }} />}
        </Flex>
    );
};

export default Main;