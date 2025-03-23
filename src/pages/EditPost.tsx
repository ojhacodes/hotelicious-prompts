
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { ImagePreview } from '@/components/ImagePreview';
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

const EditPost: React.FC = () => {
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

  const handleCaptionChange = (newCaption: string) => {
    if (!post) return;
    
    const updatedPost = {
      ...post,
      caption: newCaption
    };
    
    setPost(updatedPost);
    localStorage.setItem('generatedPost', JSON.stringify(updatedPost));
  };

  const handleFinish = () => {
    navigate('/share');
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
        <ImagePreview 
          imageUrl={post.imageUrl}
          caption={post.caption}
          onCaptionChange={handleCaptionChange}
          onFinish={handleFinish}
        />
      </div>
    </Layout>
  );
};

export default EditPost;
