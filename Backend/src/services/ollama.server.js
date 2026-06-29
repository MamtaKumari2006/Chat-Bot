
async function getOllamaReply({ model, messages }) {
    
    // Base URL from env or default
    const baseUrl = process.env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434';
    
    // Model from parameter or env or default
    const modelName = model || process.env.OLLAMA_MODEL || 'phi3:mini';

    console.log('Ollama Request:', {
        url: `${baseUrl}/api/chat`,
        model: modelName,
        messagesCount: messages.length
    });

    try {
        const response = await fetch(`${baseUrl}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: modelName,
                messages: messages,
                stream: false
            })
        });

        const data = await response.json();

        // if ollama give error
        if (!response.ok) {
            console.log('Ollama Error Response:', data);
            throw new Error(data.error || 'Failed to get response from Ollama');
        }

        // Success - return AI reply
        const aiReply = data?.message?.content || '';
        
        console.log('Ollama Success:', {
            replyLength: aiReply.length
        });

        return aiReply;

    } catch (error) {
        console.log('Ollama Service Error:', error.message);
        throw error;
    }
}


// Simple generate request (without chat history)
async function generateSimpleReply({ model, prompt }) {
    
    const baseUrl = process.env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434';
    const modelName = model || process.env.OLLAMA_MODEL || 'phi3:mini';

    try {
        const response = await fetch(`${baseUrl}/api/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: modelName,
                prompt: prompt,
                stream: false
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to generate response');
        }

        return data?.response || '';

    } catch (error) {
        console.log('Ollama Generate Error:', error.message);
        throw error;
    }
}


// Check if Ollama is running
async function checkOllamaHealth() {
    
    const baseUrl = process.env.OLLAMA_BASE_URL || 'http://127.0.0.1:11434';

    try {
        const response = await fetch(`${baseUrl}/api/tags`);
        const data = await response.json();

        if (response.ok && data.models) {
            return {
                status: 'running',
                models: data.models.map(m => m.name)
            };
        }

        return {
            status: 'error',
            message: 'Unexpected response'
        };

    } catch (error) {
        console.log("ollama error:", error.message);
        return {
            status: 'not_running',
            message: error.message
        };
    }
}


module.exports = {
    getOllamaReply,
    generateSimpleReply,
    checkOllamaHealth
};