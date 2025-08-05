import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  BookOpen,
  Heart
} from "lucide-react";
import { Link } from "react-router-dom";

const storiesData = [
  {
    id: 1,
    title: "The Last Hunt of Sheikh Ahmad",
    excerpt: "A tale of tradition, wisdom, and the sacred bond between a falconer and his bird...",
    status: "Published",
    date: "2024-01-14",
    views: 3200,
    likes: 245,
    category: "Traditional"
  },
  {
    id: 2,
    title: "Whispers in the Wind",
    excerpt: "Young Khalid discovers the ancient art of falconry from his grandfather...",
    status: "Draft",
    date: "2024-01-11",
    views: 150,
    likes: 12,
    category: "Coming of Age"
  },
  {
    id: 3,
    title: "The Golden Feather",
    excerpt: "A mystical story about a legendary falcon that grants wisdom to its chosen falconer...",
    status: "Published",
    date: "2024-01-08",
    views: 5600,
    likes: 892,
    category: "Folklore"
  }
];

const statusColors = {
  Published: "bg-green-100 text-green-800",
  Draft: "bg-yellow-100 text-yellow-800",
  Archived: "bg-gray-100 text-gray-800"
};

export default function Stories() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredStories = storiesData.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    story.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Stories Management</h1>
          <p className="text-muted-foreground">Share inspiring falcon stories and folklore</p>
        </div>
        <Button asChild className="bg-gradient-primary hover:shadow-glow transition-smooth">
          <Link to="/stories/new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Write Story
          </Link>
        </Button>
      </div>

      {/* Search */}
      <Card className="bg-gradient-card shadow-elegant">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search stories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stories Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredStories.map((story) => (
          <Card key={story.id} className="bg-gradient-card shadow-elegant hover:shadow-glow transition-smooth group">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary" className="text-xs">
                  {story.category}
                </Badge>
                <Badge className={statusColors[story.status as keyof typeof statusColors]}>
                  {story.status}
                </Badge>
              </div>
              <CardTitle className="text-lg text-foreground group-hover:text-accent transition-smooth line-clamp-2">
                {story.title}
              </CardTitle>
              <CardDescription className="text-muted-foreground line-clamp-3">
                {story.excerpt}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(story.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {story.views.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    {story.likes}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="hover:bg-secondary flex-1">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="ghost" size="sm" className="hover:bg-secondary">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="hover:bg-destructive/10 hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStories.length === 0 && (
        <Card className="bg-gradient-card shadow-elegant">
          <CardContent className="p-12 text-center">
            <div className="text-muted-foreground">
              <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No stories found</h3>
              <p>Try adjusting your search terms or write a new story.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}