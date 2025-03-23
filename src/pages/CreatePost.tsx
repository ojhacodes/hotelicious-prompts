
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { PostForm, PostFormData } from '@/components/PostForm';
import { generatePostContent } from '@/utils/openai';
import { toast } from 'sonner';

const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  
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
        <PostForm onSubmit={handleSubmit} />
      </div>
    </Layout>
  );
};

export default CreatePost;
