
const API_BASE_URL = 'http://localhost:8080';

export const registerTopic = async (topic: string) => {
    const registerTopicResponse = await fetch(`${API_BASE_URL}/register-topic/${topic}`, {
        method: 'POST'
    });
};