import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from 'axios';

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GOOGLE_GEMINI_API_KEY);

export async function generateResponse(topic, setAvatarVideoOneUrl, setAvatarVideoTwoUrl, setAvatarVideoThreeUrl, setAvatarVideoFourUrl, setVideoOneReady, setVideoTwoReady, setVideoThreeReady, setVideoFourReady) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

    const prompt = `You are transcribing a hot debate on the topic: ${topic}. There are two people, Person A and Person B. Person A is for the topic "${topic}" and Person B is against ${topic}". Generate a script that is 5 sentences for each person A and person B in the format: "Person A: <script> Person B: <script>"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = await response.text();

    text = text.replaceAll("**", "");
    text = text.replaceAll(":", "");
    const scripts = text.split("Person B");
    const scriptA = scripts[0].replace("Person A", "").trim();
    const scriptB = scripts[1].replace("Person B", "").trim();

    const prompt_2 = `Person A and B are having a debate on the topic: ${topic}. Previously, they said ${result} to each other. Person A and Person B both want to respond to each other's points and offer a rebuttal. They are very adamant about their stances and will do anything to convince the other. Generate a script that is 5 sentences for each person A and person B in the format: "Person A: <script> Person B: <script>"`;

    const result_2 = await model.generateContent(prompt_2);
    const response2 = await result_2.response;
    let text2 = await response2.text();

    text2 = text2.replaceAll("**", "");
    text2 = text2.replaceAll(":", "");
    const scripts2 = text2.split("Person B");
    const scriptA_2 = scripts2[0].replace("Person A", "").trim();
    const scriptB_2 = scripts2[1].replace("Person B", "").trim();

    console.log("POSITIVE");
    console.log(scriptA);
    console.log("NEGATIVE");
    console.log(scriptB);
    console.log("POSITIVE 2");
    console.log(scriptA_2);
    console.log("NEGATIVE 2");
    console.log(scriptB_2);

    const apiKey = process.env.REACT_APP_HEYGEN_API_KEY;

    // Process for scriptA
    let resultA = await Promise.allSettled([createVideo(apiKey, scriptA, 1)]);
    if (resultA[0].status === 'fulfilled' && resultA[0].value) {
        await checkVideoStatus(apiKey, resultA[0].value, setAvatarVideoOneUrl, setVideoOneReady);
    } else {
        console.log("Failed to create video for Person A.");
    }

    console.log("part 1");

    // Process for scriptB
    let resultB = await Promise.allSettled([createVideo(apiKey, scriptB, 2)]);
    if (resultB[0].status === 'fulfilled' && resultB[0].value) {
        await checkVideoStatus(apiKey, resultB[0].value, setAvatarVideoTwoUrl, setVideoTwoReady);
    } else {
        console.log("Failed to create video for Person B.");
    }

    console.log("part 2");

    // Process for scriptA_2
    let resultA_2 = await Promise.allSettled([createVideo(apiKey, scriptA_2, 1)]);
    if (resultA_2[0].status === 'fulfilled' && resultA_2[0].value) {
        await checkVideoStatus(apiKey, resultA_2[0].value, setAvatarVideoThreeUrl, setVideoThreeReady);
    } else {
        console.log("Failed to create second video for Person A.");
    }

    console.log("part 3");

    // Process for scriptB_2
    let resultB_2 = await Promise.allSettled([createVideo(apiKey, scriptB_2, 2)]);
    if (resultB_2[0].status === 'fulfilled' && resultB_2[0].value) {
        await checkVideoStatus(apiKey, resultB_2[0].value, setAvatarVideoFourUrl, setVideoFourReady);
    } else {
        console.log("Failed to create second video for Person B.");
    }

    console.log("part 4");
}

const createVideo = async (apiKey, scriptText, person = 1) => {
    try {
        const response = await axios.post('https://api.heygen.com/v2/video/generate', {
            video_inputs: [
                {
                    character: {
                        type: "avatar",
                        avatar_id: person === 1 ? "b34affc3a58648feb83600d072342f03" : "josh_lite3_20230714",
                        avatar_style: "normal"
                    },
                    voice: {
                        type: "text",
                        input_text: scriptText,
                        voice_id: person === 1 ? "e8939c07ae7a47619aa9cc8462f15d5d" : "1bd001e7e50f421d891986aad5158bc8",
                        speed: 1.1
                    }
                }
            ],
            test: false,
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

const checkVideoStatus = async (apiKey, videoId, setVideoUrl, updatedURL) => {
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
                updatedURL(true);
            }
        }, 10000);
    } catch (error) {
        console.error("Error checking video status:", error);
    }
};