import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from 'axios';

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GOOGLE_GEMINI_API_KEY);

export async function generateResponse(topic, setAvatarVideoOneUrl, setAvatarVideoTwoUrl) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

    const prompt = `You are transcribing a hot debate on the topic: ${topic}. There are two people, Person A and Person B. Person A is for the topic "${topic}" and Person B is against ${topic}". Generate a script for person A and person B in the format: "Person A: <script> Person B: <script>"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = await response.text(); 

    text = text.replaceAll("**", "");
    text = text.replaceAll(":", "");
    const scripts = text.split("Person B");
    const scriptA = scripts[0].replace("Person A", "");
    const scriptB = scripts[1].replace("Person B", "");

    console.log("POSITIVE");
    console.log(scriptA);
    console.log("NEGATIVE");
    console.log(scriptB);

    return;

    const apiKey = process.env.REACT_APP_HEYGEN_API_KEY;

    createVideo(apiKey, scriptA).then(videoIdA => {
        if (videoIdA) {
            checkVideoStatus(apiKey, videoIdA, setAvatarVideoOneUrl);
        } else {
            console.log("Failed to create video for Person A.");
        }
    });

    createVideo(apiKey, scriptB).then(videoIdB => {
        if (videoIdB) {
            checkVideoStatus(apiKey, videoIdB, setAvatarVideoTwoUrl);
        } else {
            console.log("Failed to create video for Person B.");
        }
    });
}

const createVideo = async (apiKey, scriptText) => {
    try {
        const response = await axios.post('https://api.heygen.com/v2/video/generate', {
            video_inputs: [
                {
                    character: {
                        type: "avatar",
                        avatar_id: "Angela-inblackskirt-20220820",
                        avatar_style: "normal"
                    },
                    voice: {
                        type: "text",
                        input_text: scriptText,
                        voice_id: "1bd001e7e50f421d891986aad5158bc8",
                        speed: 1.1
                    }
                }
            ],
            test: true,
            aspect_ratio: "16:9"
        }, {
            headers: {
                'X-Api-Key': apiKey,
                'Content-Type': 'application/json'
            }
        });

        return response.data?.data?.video_id; 
    } catch (error) {
        console.error("Error creating video:", error);
        return null;
    }
};

export const generateAvatar = async (scriptText, setVideoUrl) => {
    const apiKey = process.env.REACT_APP_HEYGEN_API_KEY;
    createVideo(apiKey, scriptText).then(videoId => {
        if (videoId) {
            checkVideoStatus(apiKey, videoId, setVideoUrl); // Pass the setVideoUrl callback
        } else {
            console.log("Failed to create video.");
        }
    }).catch(error => {
        console.error("Error creating video:", error);
    });
};

const checkVideoStatus = async (apiKey, videoId, setVideoUrl) => {
    try {
        const statusCheckInterval = setInterval(async () => {
            const response = await axios.get(`https://api.heygen.com/v1/video_status.get?video_id=${videoId}`, {
                headers: { 'X-Api-Key': apiKey }
            });

            const status = response.data?.data?.status;
            if (status === "completed") {
                clearInterval(statusCheckInterval);
                console.log("Video is ready:", response.data?.data?.video_url);
                setVideoUrl(response.data?.data?.video_url); // Update the state with the video URL
            }
        }, 5000); 
    } catch (error) {
        console.error("Error checking video status:", error);
    }
};