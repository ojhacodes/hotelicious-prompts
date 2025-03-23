
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Download,
  Share2,
  Copy
} from 'lucide-react';
import { toast } from 'sonner';

interface SocialShareProps {
  imageUrl: string;
  caption: string;
  onCreateNew: () => void;
}

export const SocialShare: React.FC<SocialShareProps> = ({ 
  imageUrl, 
  caption, 
  onCreateNew 
}) => {
  const [isLoggingIn, setIsLoggingIn] = useState<string | null>(null);

  const handleSocialLogin = (platform: string) => {
    setIsLoggingIn(platform);
    
    setTimeout(() => {
      toast.success(`Please authenticate with ${platform} in the popup window`);
      
      // Simulate login popup
      setTimeout(() => {
        toast("Login successful!");
        setIsLoggingIn(null);
        toast.success(`Posted successfully to ${platform}!`);
      }, 2000);
    }, 500);
  };

  const downloadImage = () => {
    // Create a temporary link to download the image
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'hotel-social-post.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Image downloaded successfully!");
  };

  const copyCaption = () => {
    navigator.clipboard.writeText(caption);
    toast.success("Caption copied to clipboard!");
  };

  return (
    <div className="w-full animate-fade-up">
      <Card className="glass-panel overflow-hidden">
        <div className="p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-semibold mb-2">Share Your Post</h1>
            <p className="text-muted-foreground">
              Share your post on social media or download it for later use
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="md:w-1/2">
              <div className="rounded-lg overflow-hidden border border-white/20 shadow-lg mb-4">
                <img 
                  src={imageUrl} 
                  alt="Your social media post" 
                  className="w-full h-auto"
                />
              </div>
              
              <div className="bg-white/50 dark:bg-black/40 border border-white/20 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Caption</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={copyCaption}
                    className="h-8 px-2"
                  >
                    <Copy className="w-4 h-4 mr-1" /> Copy
                  </Button>
                </div>
                <p className="text-sm">{caption}</p>
              </div>
            </div>
            
            <div className="md:w-1/2 space-y-6">
              <div>
                <h3 className="font-medium mb-3">Share to social media</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className="bg-white/50 border-white/20 hover:bg-blue-500 hover:text-white transition-colors"
                    onClick={() => handleSocialLogin('Facebook')}
                    disabled={!!isLoggingIn}
                  >
                    <Facebook className="w-4 h-4 mr-2" /> 
                    {isLoggingIn === 'Facebook' ? 'Connecting...' : 'Facebook'}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="bg-white/50 border-white/20 hover:bg-pink-500 hover:text-white transition-colors"
                    onClick={() => handleSocialLogin('Instagram')}
                    disabled={!!isLoggingIn}
                  >
                    <Instagram className="w-4 h-4 mr-2" /> 
                    {isLoggingIn === 'Instagram' ? 'Connecting...' : 'Instagram'}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="bg-white/50 border-white/20 hover:bg-blue-400 hover:text-white transition-colors"
                    onClick={() => handleSocialLogin('Twitter')}
                    disabled={!!isLoggingIn}
                  >
                    <Twitter className="w-4 h-4 mr-2" /> 
                    {isLoggingIn === 'Twitter' ? 'Connecting...' : 'Twitter'}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="bg-white/50 border-white/20 hover:bg-blue-700 hover:text-white transition-colors"
                    onClick={() => handleSocialLogin('LinkedIn')}
                    disabled={!!isLoggingIn}
                  >
                    <Linkedin className="w-4 h-4 mr-2" /> 
                    {isLoggingIn === 'LinkedIn' ? 'Connecting...' : 'LinkedIn'}
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                <h3 className="font-medium mb-1">Save for later</h3>
                <Button 
                  variant="outline" 
                  className="bg-white/50 border-white/20"
                  onClick={downloadImage}
                >
                  <Download className="w-4 h-4 mr-2" /> Download Image
                </Button>
                
                <Button 
                  variant="outline" 
                  className="bg-white/50 border-white/20"
                  onClick={copyCaption}
                >
                  <Copy className="w-4 h-4 mr-2" /> Copy Caption
                </Button>
              </div>
              
              <div className="pt-4">
                <Button 
                  className="w-full"
                  variant="default"
                  onClick={onCreateNew}
                >
                  <Share2 className="w-4 h-4 mr-2" /> Create New Post
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
