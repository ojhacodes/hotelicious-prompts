
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { PostForm, PostFormData } from '@/components/PostForm';
import { generatePostContent, checkOpenAIConnection } from '@/utils/openai';
import { toast } from 'sonner';
import { Sparkles } from 'lucide-react';

const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const [apiStatus, setApiStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  
  useEffect(() => {
    // Check OpenAI API connection when component mounts
    const checkApi = async () => {
      try {
        const isConnected = await checkOpenAIConnection();
        setApiStatus(isConnected ? 'connected' : 'error');
        
        if (isConnected) {
          console.log("OpenAI API is connected and working");
        } else {
          console.warn("OpenAI API connection failed. Will use fallback content.");
          toast.warning("OpenAI API connection issue detected. Using fallback content generation.", {
            duration: 5000
          });
        }
      } catch (error) {
        console.error("Error checking API:", error);
        setApiStatus('error');
      }
    };
    
    checkApi();
  }, []);
  
  const handleSubmit = async (formData: PostFormData) => {
    try {
      // Generate post content (image and caption)
      const result = await generatePostContent(formData);
      
      // Save generated content to localStorage
      localStorage.setItem('generatedPost', JSON.stringify({
        imageUrl: result.imageUrl,
        caption: result.caption,
        formData: formData
      }));
      
      // Navigate to edit page
      navigate('/edit');
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post. Please try again.");
    }
  };
  
  return (
    <Layout>
      <div className="py-16 page-transition">
        {apiStatus === 'checking' && (
          <div className="mb-4 text-center text-sm text-muted-foreground">
            Checking OpenAI API connection...
          </div>
        )}
        
        {apiStatus === 'error' && (
          <div className="mb-4 p-3 border border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-600/50 rounded-md text-sm text-yellow-700 dark:text-yellow-400">
            ⚠️ OpenAI API connection issue detected. The app will use fallback content generation.
          </div>
        )}
        
        <div className="mb-8 text-center">
          <div className="inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 p-1 rounded-full animate-pulse">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h1 className="mt-4 text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            Create Amazing Posts
          </h1>
          <p className="mt-2 text-muted-foreground max-w-xl mx-auto">
            Generate beautiful social media content for your hotel with AI assistance
          </p>
        </div>
        
        <PostForm onSubmit={handleSubmit} />
      </div>
    </Layout>
  );
};

export default CreatePost;
