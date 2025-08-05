import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, Eye, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import falconStoryImage from "@/assets/falcon-story.jpg";

export default function CreateStory() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    status: "Draft"
  });

  const categories = ["Traditional", "Coming of Age", "Folklore", "Adventure", "Historical", "Modern"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.excerpt || !formData.content || !formData.category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically save to your backend/database
    toast({
      title: "Success!",
      description: `Story "${formData.title}" has been ${formData.status.toLowerCase()}.`,
    });
    
    navigate("/stories");
  };

  const handlePublish = () => {
    setFormData(prev => ({ ...prev, status: "Published" }));
    setTimeout(() => {
      const event = new Event('submit', { bubbles: true, cancelable: true });
      document.querySelector('form')?.dispatchEvent(event);
    }, 100);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Hero Section */}
      <div className="relative h-48 rounded-lg overflow-hidden">
        <img 
          src={falconStoryImage} 
          alt="Falcon Stories" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40 flex items-center">
          <div className="p-8 text-primary-foreground">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="h-8 w-8" />
              <h1 className="text-4xl font-bold">Write Falcon Story</h1>
            </div>
            <p className="text-lg opacity-90">Share inspiring tales and folklore about falcons with the world</p>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/stories")}
            className="hover:bg-secondary"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{formData.status}</Badge>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gradient-card shadow-elegant">
              <CardHeader>
                <CardTitle className="text-foreground">Story Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Story Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter your story title..."
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="text-lg"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="excerpt">Story Excerpt *</Label>
                  <Textarea
                    id="excerpt"
                    placeholder="A brief, compelling summary of your story..."
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="content">Story Content *</Label>
                  <Textarea
                    id="content"
                    placeholder="Write your falcon story here... Let your imagination soar!"
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    rows={15}
                    className="min-h-[400px]"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-gradient-card shadow-elegant">
              <CardHeader>
                <CardTitle className="text-foreground">Story Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Story Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select story type" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Publication Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Writing Tips */}
            <Card className="bg-gradient-card shadow-elegant">
              <CardHeader>
                <CardTitle className="text-sm text-foreground">Writing Tips</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Start with a compelling opening</li>
                  <li>• Include vivid descriptions of falcons</li>
                  <li>• Share cultural traditions</li>
                  <li>• Add emotional depth to characters</li>
                  <li>• End with a meaningful message</li>
                </ul>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="bg-gradient-card shadow-elegant">
              <CardContent className="p-4 space-y-3">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => toast({ title: "Preview", description: "Story preview coming soon!" })}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Story
                </Button>
                
                <Button
                  type="submit"
                  variant="secondary"
                  className="w-full"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Draft
                </Button>
                
                <Button
                  type="button"
                  onClick={handlePublish}
                  className="w-full bg-gradient-primary hover:shadow-glow transition-smooth"
                >
                  Publish Story
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}