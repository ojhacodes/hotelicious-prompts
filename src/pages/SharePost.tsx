
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { SocialShare } from '@/components/SocialShare';
import { toast } from 'sonner';

interface StoredPost {
  imageUrl: string;
  caption: string;
  formData: {
    event: string;
    customPrompt: string;
    tone: string;
    hotelName: string;
  };
}

const SharePost: React.FC = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState<StoredPost | null>(null);

  useEffect(() => {
    // Retrieve generated post from localStorage
    const storedPost = localStorage.getItem('generatedPost');
    
    if (!storedPost) {
      toast.error("No post found. Please create a post first.");
      navigate('/');
      return;
    }
    
    try {
      const parsedPost = JSON.parse(storedPost) as StoredPost;
      setPost(parsedPost);
    } catch (error) {
      console.error("Error parsing stored post:", error);
      toast.error("Error loading post. Please create a new one.");
      navigate('/');
    }
  }, [navigate]);

  const handleCreateNew = () => {
    // Clear stored post
    localStorage.removeItem('generatedPost');
    navigate('/');
  };

  if (!post) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <p className="text-muted-foreground">Loading post...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-16 page-transition">
        <SocialShare 
          imageUrl={post.imageUrl}
          caption={post.caption}
          onCreateNew={handleCreateNew}
        />
      </div>
    </Layout>
  );
};

export default SharePost;
