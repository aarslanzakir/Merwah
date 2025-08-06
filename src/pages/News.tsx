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
  Filter,
  Newspaper
} from "lucide-react";
import { Link } from "react-router-dom";

const newsData = [
  {
    id: 1,
    title: "New Falcon Species Discovered in the Arabian Desert",
    excerpt: "Researchers have identified a new subspecies of falcon native to the Arabian Peninsula...",
    status: "Published",
    date: "2024-01-15",
    views: 1250,
    category: "Conservation",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=60"
  },
  {
    id: 2,
    title: "Annual Falcon Festival Announces Record Participation",
    excerpt: "This year's festival will feature over 500 participants from across the region...",
    status: "Draft",
    date: "2024-01-12",
    views: 890,
    category: "Events",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=60"
  },
  {
    id: 3,
    title: "Traditional Falcon Training Methods Preserved",
    excerpt: "Ancient techniques passed down through generations continue to be practiced...",
    status: "Published",
    date: "2024-01-10",
    views: 2100,
    category: "Culture",
    image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=800&q=60"
  }
];

const statusColors = {
  Published: "bg-green-100 text-green-800",
  Draft: "bg-yellow-100 text-yellow-800",
  Archived: "bg-gray-100 text-gray-800"
};

export default function News() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNews = newsData.filter((news) =>
    news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    news.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    news.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">News Management</h1>
          <p className="text-muted-foreground">Create and manage falcon news articles</p>
        </div>
        <Button asChild className="bg-gradient-primary hover:shadow-glow transition-smooth">
          <Link to="/news/new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create News
          </Link>
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="bg-gradient-card shadow-elegant">
        <CardContent className="p-6">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search news articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* News List */}
      <div className="grid gap-6">
        {filteredNews.map((news) => (
          <Card key={news.id} className="bg-gradient-card shadow-elegant hover:shadow-glow transition-smooth">
            <CardHeader className="p-4 md:p-6">
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                {/* Thumbnail */}
                <div className="flex-shrink-0 w-full md:w-48 h-36 overflow-hidden rounded-md bg-muted/10">
                  {news.image ? (
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // fallback if image fails to load
                        (e.target as HTMLImageElement).src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='100%25' height='100%25' fill='%23E5E7EB'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239CA3AF' font-size='20'%3ENo image%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      No image
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {news.category}
                      </Badge>
                      <span className={`px-2 py-1 text-xs rounded ${statusColors[news.status as keyof typeof statusColors]}`}>
                        {news.status}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="hover:bg-secondary">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:bg-secondary">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:bg-destructive/10 hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <CardTitle className="text-lg md:text-xl text-foreground hover:text-accent transition-smooth mt-3">
                    {news.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground mt-1">
                    {news.excerpt}
                  </CardDescription>

                  <div className="flex items-center gap-6 text-sm text-muted-foreground mt-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(news.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {news.views.toLocaleString()} views
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            {/* optional extra content / actions */}
            <CardContent className="pt-0" />
          </Card>
        ))}
      </div>

      {filteredNews.length === 0 && (
        <Card className="bg-gradient-card shadow-elegant">
          <CardContent className="p-12 text-center">
            <div className="text-muted-foreground">
              <Newspaper className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No news articles found</h3>
              <p>Try adjusting your search terms or create a new article.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
