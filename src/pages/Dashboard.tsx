import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Newspaper, BookOpen, ScrollText, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import falconHero from "@/assets/falcon-hero.jpg";

const stats = [
  {
    title: "Total News",
    value: "24",
    change: "+12%",
    icon: Newspaper,
    color: "text-blue-600"
  },
  {
    title: "Stories Published",
    value: "18",
    change: "+8%",
    icon: BookOpen,
    color: "text-green-600"
  },
  {
    title: "Fatwas Issued",
    value: "32",
    change: "+15%",
    icon: ScrollText,
    color: "text-purple-600"
  },
  {
    title: "Total Views",
    value: "12.4K",
    change: "+23%",
    icon: TrendingUp,
    color: "text-accent"
  }
];

const recentActivity = [
  { type: "News", title: "Falcon Conservation Update", time: "2 hours ago" },
  { type: "Story", title: "The Hunter's Tale", time: "5 hours ago" },
  { type: "Fatwa", title: "Ruling on Falcon Training", time: "1 day ago" },
  { type: "News", title: "Desert Falcon Sighting", time: "2 days ago" },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative h-48 rounded-xl overflow-hidden shadow-elegant">
        <img 
          src={falconHero} 
          alt="Falcon in flight" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent">
          <div className="p-8 h-full flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome to Falcon Admin</h1>
            <p className="text-white/90 text-lg">Manage your falcon content with ease</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-gradient-card shadow-elegant hover:shadow-glow transition-smooth">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-accent">
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-card shadow-elegant">
        <CardHeader>
          <CardTitle className="text-foreground">Quick Actions</CardTitle>
          <CardDescription>Create new content quickly</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button asChild className="h-24 bg-gradient-primary hover:shadow-glow transition-smooth">
              <Link to="/news/new" className="flex flex-col items-center gap-2">
                <Newspaper className="h-6 w-6" />
                <span>Create News</span>
              </Link>
            </Button>
            <Button asChild variant="secondary" className="h-24 hover:shadow-elegant transition-smooth">
              <Link to="/stories/new" className="flex flex-col items-center gap-2">
                <BookOpen className="h-6 w-6" />
                <span>Write Story</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-24 hover:shadow-elegant transition-smooth">
              <Link to="/fatwas/new" className="flex flex-col items-center gap-2">
                <ScrollText className="h-6 w-6" />
                <span>Issue Fatwa</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-gradient-card shadow-elegant">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Activity</CardTitle>
          <CardDescription>Latest content updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-smooth">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <div>
                    <p className="font-medium text-foreground">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.type}</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}