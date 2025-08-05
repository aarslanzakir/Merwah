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
  ScrollText,
  Scale,
  BookMarked
} from "lucide-react";
import { Link } from "react-router-dom";

const fatwasData = [
  {
    id: 1,
    title: "Ruling on Training Falcons During Hunting Season",
    question: "Is it permissible to train falcons during the official hunting season?",
    status: "Published",
    date: "2024-01-13",
    views: 2800,
    category: "Training",
    scholar: "Sheikh Abdullah Al-Mansouri"
  },
  {
    id: 2,
    title: "Permissibility of Falcon Racing for Prize Money",
    question: "What is the Islamic ruling on participating in falcon races with monetary prizes?",
    status: "Under Review",
    date: "2024-01-09",
    views: 1200,
    category: "Competition",
    scholar: "Dr. Muhammad Al-Falahi"
  },
  {
    id: 3,
    title: "Breeding Falcons for Commercial Purposes",
    question: "Is it allowed to breed falcons specifically for selling them?",
    status: "Published",
    date: "2024-01-05",
    views: 4100,
    category: "Breeding",
    scholar: "Sheikh Omar Al-Quraishi"
  }
];

const statusColors = {
  Published: "bg-green-100 text-green-800",
  "Under Review": "bg-blue-100 text-blue-800",
  Draft: "bg-yellow-100 text-yellow-800",
  Archived: "bg-gray-100 text-gray-800"
};

export default function Fatwas() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredFatwas = fatwasData.filter(fatwa =>
    fatwa.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fatwa.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fatwa.scholar.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Fatwas Management</h1>
          <p className="text-muted-foreground">Islamic rulings and guidance related to falconry</p>
        </div>
        <Button asChild className="bg-gradient-primary hover:shadow-glow transition-smooth">
          <Link to="/fatwas/new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Issue Fatwa
          </Link>
        </Button>
      </div>

      {/* Search */}
      <Card className="bg-gradient-card shadow-elegant">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search fatwas by title, category, or scholar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Fatwas List */}
      <div className="grid gap-6">
        {filteredFatwas.map((fatwa) => (
          <Card key={fatwa.id} className="bg-gradient-card shadow-elegant hover:shadow-glow transition-smooth">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary" className="text-xs">
                      {fatwa.category}
                    </Badge>
                    <Badge className={statusColors[fatwa.status as keyof typeof statusColors]}>
                      {fatwa.status}
                    </Badge>
                  </div>
                  
                  <div>
                    <CardTitle className="text-xl text-foreground hover:text-accent transition-smooth mb-2">
                      {fatwa.title}
                    </CardTitle>
                    <div className="bg-secondary/30 rounded-lg p-3 mb-3">
                      <p className="text-sm text-muted-foreground mb-1 font-medium">Question:</p>
                      <p className="text-sm text-foreground italic">{fatwa.question}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <BookMarked className="h-4 w-4" />
                      {fatwa.scholar}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(fatwa.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {fatwa.views.toLocaleString()} views
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
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
            </CardHeader>
          </Card>
        ))}
      </div>

      {filteredFatwas.length === 0 && (
        <Card className="bg-gradient-card shadow-elegant">
          <CardContent className="p-12 text-center">
            <div className="text-muted-foreground">
              <Scale className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No fatwas found</h3>
              <p>Try adjusting your search terms or issue a new fatwa.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}