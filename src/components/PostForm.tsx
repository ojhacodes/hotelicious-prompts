
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export interface PostFormData {
  event: string;
  customPrompt: string;
  tone: string;
  hotelName: string;
}

interface PostFormProps {
  onSubmit: (data: PostFormData) => void;
}

export const PostForm: React.FC<PostFormProps> = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<PostFormData>({
    event: '',
    customPrompt: '',
    tone: 'professional',
    hotelName: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.event) {
      toast.error("Please enter an event");
      return;
    }
    
    if (!formData.hotelName) {
      toast.error("Please enter your hotel name");
      return;
    }
    
    setIsLoading(true);
    
    try {
      await onSubmit(formData);
      navigate('/edit'); // Navigate to the edit page
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to create post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full glass-panel animate-fade-up overflow-hidden">
      <div className="p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold mb-2">Create Your Post</h1>
          <p className="text-muted-foreground">
            Enter the details to generate a custom social media post for your hotel
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="hotelName">Hotel Name</Label>
            <Input
              id="hotelName"
              name="hotelName"
              placeholder="Enter your hotel name"
              value={formData.hotelName}
              onChange={handleChange}
              className="bg-white/50 border-white/20 backdrop-blur-sm"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="event">Event or Occasion</Label>
            <Input
              id="event"
              name="event"
              placeholder="E.g., Diwali, Independence Day, Women's Day"
              value={formData.event}
              onChange={handleChange}
              className="bg-white/50 border-white/20 backdrop-blur-sm"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="tone">Content Tone</Label>
            <Select
              value={formData.tone}
              onValueChange={(value) => handleSelectChange('tone', value)}
            >
              <SelectTrigger className="bg-white/50 border-white/20 backdrop-blur-sm">
                <SelectValue placeholder="Select tone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional">Professional</SelectItem>
                <SelectItem value="friendly">Friendly</SelectItem>
                <SelectItem value="luxurious">Luxurious</SelectItem>
                <SelectItem value="celebratory">Celebratory</SelectItem>
                <SelectItem value="informative">Informative</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="customPrompt">Additional Details (Optional)</Label>
            <Textarea
              id="customPrompt"
              name="customPrompt"
              placeholder="Any specific details you'd like to include..."
              value={formData.customPrompt}
              onChange={handleChange}
              className="bg-white/50 border-white/20 backdrop-blur-sm min-h-[100px]"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "Generate Post"}
          </Button>
        </form>
      </div>
    </Card>
  );
};
