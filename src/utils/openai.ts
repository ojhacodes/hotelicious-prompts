
import { toast } from "sonner";

export interface GenerationRequest {
  event: string;
  customPrompt: string;
  tone: string;
  hotelName: string;
}

export interface GenerationResponse {
  imageUrl: string;
  caption: string;
}

// OpenAI API key
const OPENAI_API_KEY = "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";

export const generatePostContent = async (
  params: GenerationRequest
): Promise<GenerationResponse> => {
  // Show a loading toast
  const loadingToast = toast.loading("Generating your post...");
  
  try {
    // Sample images for different events (as fallback)
    const sampleImages: Record<string, string> = {
      default: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2059&auto=format&fit=crop",
      diwali: "https://images.unsplash.com/photo-1604823751393-be9c2ac85ed1?q=80&w=1974&auto=format&fit=crop",
      christmas: "https://images.unsplash.com/photo-1543158181-e6f9f6712055?q=80&w=2070&auto=format&fit=crop",
      independence: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=1776&auto=format&fit=crop",
      "women's day": "https://images.unsplash.com/photo-1607748862156-7c548e7e98f4?q=80&w=1974&auto=format&fit=crop",
      holi: "https://images.unsplash.com/photo-1617858823-e9ad7e5a2b60?q=80&w=1976&auto=format&fit=crop",
    };
    
    // Find a matching image (fallback in case API fails)
    const event = params.event.toLowerCase();
    let imageUrl = sampleImages.default;
    
    for (const [key, url] of Object.entries(sampleImages)) {
      if (event.includes(key)) {
        imageUrl = url;
        break;
      }
    }
    
    // Create the prompt for OpenAI
    const prompt = `Create a social media caption for a hotel named "${params.hotelName}" for the occasion of "${params.event}". 
    The tone should be "${params.tone}". 
    ${params.customPrompt ? `Additional context: ${params.customPrompt}` : ''}
    Include relevant hashtags at the end of the caption.
    Keep the caption professional, engaging and under 150 words.`;
    
    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a professional social media marketer specialized in creating engaging captions for hotels' social media posts."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 300
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API error:", errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || "Unknown error"}`);
    }
    
    const data = await response.json();
    const caption = data.choices[0]?.message?.content || "";
    
    // Dismiss the loading toast
    toast.dismiss(loadingToast);
    toast.success("Post generated successfully!");
    
    return {
      imageUrl,
      caption
    };
  } catch (error) {
    // Dismiss the loading toast and show error
    toast.dismiss(loadingToast);
    toast.error("Failed to generate post. Please try again.");
    console.error("Error generating post:", error);
    
    // Return a fallback response
    return {
      imageUrl: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2059&auto=format&fit=crop",
      caption: `Celebrate with ${params.hotelName}. Join us for special events and create unforgettable memories.`
    };
  }
};

// Placeholder for stable diffusion API integration
export const generateImageWithStableDiffusion = async (prompt: string): Promise<string> => {
  try {
    // This would be replaced with actual API call
    console.log("Generating image with prompt:", prompt);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // For now, return a placeholder image
    return "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2059&auto=format&fit=crop";
  } catch (error) {
    console.error("Error generating image:", error);
    throw new Error("Failed to generate image");
  }
};
