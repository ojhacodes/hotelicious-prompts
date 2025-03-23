
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

// This is a placeholder function that simulates API calls
// In a real implementation, this would call the OpenAI API
export const generatePostContent = async (
  params: GenerationRequest
): Promise<GenerationResponse> => {
  // Show a loading toast
  const loadingToast = toast.loading("Generating your post...");
  
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Sample images for different events
    const sampleImages: Record<string, string> = {
      default: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2059&auto=format&fit=crop",
      diwali: "https://images.unsplash.com/photo-1604823751393-be9c2ac85ed1?q=80&w=1974&auto=format&fit=crop",
      christmas: "https://images.unsplash.com/photo-1543158181-e6f9f6712055?q=80&w=2070&auto=format&fit=crop",
      independence: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=1776&auto=format&fit=crop",
      "women's day": "https://images.unsplash.com/photo-1607748862156-7c548e7e98f4?q=80&w=1974&auto=format&fit=crop",
      holi: "https://images.unsplash.com/photo-1617858823-e9ad7e5a2b60?q=80&w=1976&auto=format&fit=crop",
    };
    
    // Find a matching image or use default
    const event = params.event.toLowerCase();
    let imageUrl = sampleImages.default;
    
    for (const [key, url] of Object.entries(sampleImages)) {
      if (event.includes(key)) {
        imageUrl = url;
        break;
      }
    }
    
    // Generate a caption based on the event and tone
    let caption = "";
    
    switch (params.tone) {
      case "professional":
        caption = `${params.hotelName} wishes you a wonderful ${params.event}. Join us for special celebrations and create memories that last a lifetime.`;
        break;
      case "friendly":
        caption = `Happy ${params.event} from all of us at ${params.hotelName}! Come celebrate with us and enjoy our special offerings!`;
        break;
      case "luxurious":
        caption = `Experience the grand celebration of ${params.event} at ${params.hotelName}. Indulge in luxury and make this occasion truly exceptional.`;
        break;
      case "celebratory":
        caption = `It's time to celebrate ${params.event} at ${params.hotelName}! Join us for an unforgettable experience filled with joy and festivities.`;
        break;
      case "informative":
        caption = `${params.hotelName} brings you special ${params.event} packages. Book now to avail exclusive offers and make your celebration memorable.`;
        break;
      default:
        caption = `Celebrate ${params.event} with ${params.hotelName}. We look forward to making your experience special.`;
    }
    
    // Add custom prompt details if provided
    if (params.customPrompt) {
      caption += ` ${params.customPrompt}`;
    }
    
    // Add hashtags
    caption += `\n\n#${params.event.replace(/\s+/g, '')} #${params.hotelName.replace(/\s+/g, '')} #Celebration`;
    
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
