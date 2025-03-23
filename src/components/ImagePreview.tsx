
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Type, 
  Image as ImageIcon,
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface ImagePreviewProps {
  imageUrl: string;
  caption: string;
  onCaptionChange: (caption: string) => void;
  onFinish: () => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ 
  imageUrl, 
  caption, 
  onCaptionChange,
  onFinish
}) => {
  const [zoom, setZoom] = useState(100);
  const [captionText, setCaptionText] = useState(caption);
  const [isEditing, setIsEditing] = useState(false);

  const handleZoomChange = (value: number[]) => {
    setZoom(value[0]);
  };

  const handleCaptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCaptionText(e.target.value);
  };

  const saveCaption = () => {
    onCaptionChange(captionText);
    setIsEditing(false);
    toast.success("Caption updated");
  };

  const handleFinish = () => {
    onFinish();
  };

  return (
    <div className="w-full animate-fade-up">
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="glass-panel flex-1 overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-medium mb-4">Preview</h2>
            <div className="relative overflow-hidden rounded-lg border border-white/20 aspect-square bg-muted/20 flex items-center justify-center">
              {imageUrl ? (
                <img 
                  src={imageUrl} 
                  alt="Generated post" 
                  className="w-full h-full object-cover transition-transform duration-200"
                  style={{ transform: `scale(${zoom / 100})` }}
                />
              ) : (
                <div className="text-center p-6">
                  <ImageIcon className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-muted-foreground">Image preview will appear here</p>
                </div>
              )}
            </div>
          </div>
        </Card>

        <Card className="glass-panel md:w-[350px] p-6">
          <h2 className="text-xl font-medium mb-4">Edit Post</h2>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="flex items-center justify-between">
                <span>Image Zoom</span>
                <span className="text-xs text-muted-foreground">{zoom}%</span>
              </Label>
              <div className="flex items-center space-x-3">
                <ZoomOut className="w-4 h-4 text-muted-foreground" />
                <Slider
                  value={[zoom]}
                  min={50}
                  max={150}
                  step={5}
                  onValueChange={handleZoomChange}
                />
                <ZoomIn className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Caption</Label>
                {!isEditing && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 px-2"
                    onClick={() => setIsEditing(true)}
                  >
                    <Type className="w-4 h-4 mr-1" /> Edit
                  </Button>
                )}
              </div>
              
              {isEditing ? (
                <div className="space-y-2">
                  <Textarea
                    value={captionText}
                    onChange={handleCaptionChange}
                    className="min-h-[120px] bg-white/50 border-white/20 backdrop-blur-sm"
                  />
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        setCaptionText(caption);
                        setIsEditing(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      size="sm"
                      onClick={saveCaption}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-white/50 border border-white/20 rounded-md min-h-[120px] text-sm">
                  {captionText || "No caption provided"}
                </div>
              )}
            </div>

            <div className="pt-4">
              <Button onClick={handleFinish} className="w-full">
                <CheckCircle className="w-4 h-4 mr-2" /> 
                Finish Editing
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
