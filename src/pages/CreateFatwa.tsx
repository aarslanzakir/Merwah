import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, Eye, Scale, BookMarked } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import falconFatwaImage from "@/assets/falcon-fatwa.jpg";

export default function CreateFatwa() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    question: "",
    answer: "",
    evidence: "",
    category: "",
    scholar: "",
    status: "Draft"
  });

  const categories = ["Training", "Competition", "Breeding", "Hunting", "Care", "Trading", "Ethics"];
  const scholars = [
    "Sheikh Abdullah Al-Mansouri",
    "Dr. Muhammad Al-Falahi", 
    "Sheikh Omar Al-Quraishi",
    "Dr. Ahmad Al-Najdi",
    "Sheikh Khalid Al-Thani"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.question || !formData.answer || !formData.category || !formData.scholar) {
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
      description: `Fatwa "${formData.title}" has been ${formData.status.toLowerCase()}.`,
    });
    
    navigate("/fatwas");
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
          src={falconFatwaImage} 
          alt="Islamic Fatwa" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40 flex items-center">
          <div className="p-8 text-primary-foreground">
            <div className="flex items-center gap-3 mb-2">
              <Scale className="h-8 w-8" />
              <h1 className="text-4xl font-bold">Issue Islamic Fatwa</h1>
            </div>
            <p className="text-lg opacity-90">Provide religious guidance and rulings on falconry matters</p>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/fatwas")}
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
                <CardTitle className="text-foreground">Fatwa Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Fatwa Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter the fatwa title or ruling subject..."
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="text-lg"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="question">Question *</Label>
                  <Textarea
                    id="question"
                    placeholder="What is the specific question being asked?"
                    value={formData.question}
                    onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="answer">Islamic Ruling & Answer *</Label>
                  <Textarea
                    id="answer"
                    placeholder="Provide the detailed Islamic ruling and explanation..."
                    value={formData.answer}
                    onChange={(e) => setFormData(prev => ({ ...prev, answer: e.target.value }))}
                    rows={10}
                    className="min-h-[250px]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="evidence">Religious Evidence & References</Label>
                  <Textarea
                    id="evidence"
                    placeholder="Cite Quran verses, Hadith, or scholarly opinions supporting this ruling..."
                    value={formData.evidence}
                    onChange={(e) => setFormData(prev => ({ ...prev, evidence: e.target.value }))}
                    rows={6}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-gradient-card shadow-elegant">
              <CardHeader>
                <CardTitle className="text-foreground">Fatwa Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="scholar">Issuing Scholar *</Label>
                  <Select value={formData.scholar} onValueChange={(value) => setFormData(prev => ({ ...prev, scholar: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select scholar" />
                    </SelectTrigger>
                    <SelectContent>
                      {scholars.map((scholar) => (
                        <SelectItem key={scholar} value={scholar}>
                          {scholar}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Falconry Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
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
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Under Review">Under Review</SelectItem>
                      <SelectItem value="Published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Guidelines */}
            <Card className="bg-gradient-card shadow-elegant">
              <CardHeader>
                <CardTitle className="text-sm text-foreground flex items-center gap-2">
                  <BookMarked className="h-4 w-4" />
                  Fatwa Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Base rulings on Quran & Sunnah</li>
                  <li>• Consider scholarly consensus</li>
                  <li>• Address specific circumstances</li>
                  <li>• Provide clear, practical guidance</li>
                  <li>• Include supporting evidence</li>
                  <li>• Use accessible language</li>
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
                  onClick={() => toast({ title: "Review", description: "Fatwa review process coming soon!" })}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Review Fatwa
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
                  Issue Fatwa
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}