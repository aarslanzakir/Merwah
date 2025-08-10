import { useEffect, useState } from "react";
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
  Tag,
  DollarSign
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Falcon {
  id: string; // looks like UUID from your example
  name_ar: string;
  category: string;
  description: string;
  price: number;
  image_url?: string; // match backend
  created_at?: string; // match backend
}


export default function Falcons() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [falcons, setFalcons] = useState<Falcon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/falcons")
      .then((res) => res.json())
      .then((data) => {
        setFalcons(data);
        setLoading(false);
      })
      .catch(() => {
        toast({ title: "Error", description: "Failed to load falcons", variant: "destructive" });
        setLoading(false);
      });
  }, []);

  const filteredFalcons = falcons.filter(falcon =>
    falcon.name_ar?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    falcon.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    falcon.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Falcons Management</h1>
          <p className="text-muted-foreground">Manage your falcons for sale or exhibition</p>
        </div>
        <Button asChild className="bg-gradient-primary hover:shadow-glow transition-smooth">
          <Link to="/falcons/new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Falcon
          </Link>
        </Button>
      </div>

      {/* Search */}
      <Card className="bg-gradient-card shadow-elegant">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search falcons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Falcons Grid */}
      {loading ? (
        <p className="text-muted-foreground">Loading falcons...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredFalcons.map((falcon) => (
            <Card
              key={falcon.id}
              className="bg-gradient-card shadow-elegant hover:shadow-glow transition-smooth group overflow-hidden"
            >
              {/* Image */}
              <div className="w-full h-44 bg-muted/10 overflow-hidden">
            {falcon.image_url ? (
                      <img
                    src={falcon.image_url}
                    alt={falcon.name_ar}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400'%3E%3Crect width='100%25' height='100%25' fill='%23F3F4F6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239CA3AF' font-size='20'%3EImage not available%3C/text%3E%3C/svg%3E";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No image
                  </div>
                )}
              </div>

              <CardHeader className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {falcon.category || "Uncategorized"}
                  </Badge>
                  <Badge className="bg-green-100 text-green-800">
                    Available
                  </Badge>
                </div>
                <CardTitle className="text-lg text-foreground group-hover:text-accent transition-smooth line-clamp-2">
                  {falcon.name_ar}
                </CardTitle>
                <CardDescription className="text-muted-foreground line-clamp-3">
                  {falcon.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
{falcon.created_at ? new Date(falcon.created_at).toLocaleDateString() : "N/A"}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      {falcon.price?.toLocaleString()} SAR
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
      )}

      {!loading && filteredFalcons.length === 0 && (
        <Card className="bg-gradient-card shadow-elegant">
          <CardContent className="p-12 text-center">
            <div className="text-muted-foreground">
              <Tag className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No falcons found</h3>
              <p>Try adjusting your search terms or add a new falcon.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
