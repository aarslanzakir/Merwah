// src/pages/Falcons.tsx
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, ImagePlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
//Falcons
interface Falcon {
  id: string;
  name_ar: string;
  category: string;
  description: string;
  price: number;
  image_url: string;
  created_at?: string;
}

export default function Falcons() {
  const { toast } = useToast();
  const [falcons, setFalcons] = useState<Falcon[]>([]);
  const [formData, setFormData] = useState({
    name_ar: "",
    category: "",
    description: "",
    price: "",
    image_url: null as File | null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Fetch falcons list
  useEffect(() => {
    fetch("http://localhost:3000/api/falcons")
      .then((res) => res.json())
      .then((data) => setFalcons(data))
      .catch(() =>
        toast({
          title: "Error",
          description: "Failed to load falcons",
          variant: "destructive",
        })
      );
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      setFormData((prev) => ({ ...prev, image_url: file }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, image_url: null }));
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name_ar ||
      !formData.category ||
      !formData.description ||
      !formData.price ||
      !formData.image_url
    ) {
      toast({
        title: "Validation Error",
        description: "All fields are required",
        variant: "destructive",
      });
      return;
    }

    const fd = new FormData();
    fd.append(
      "data",
      JSON.stringify({
        name_ar: formData.name_ar,
        category: formData.category,
        description: formData.description,
        price: Number(formData.price),
      })
    );
    fd.append("image", formData.image_url); // ✅ Match your curl request

    try {
      const res = await fetch("http://localhost:3000/api/falcons", {
        method: "POST",
        body: fd,
      });

      if (!res.ok) throw new Error();
      const newFalcon = await res.json();

      setFalcons((prev) => [...prev, newFalcon]);
      toast({
        title: "Success",
        description: "Falcon added successfully",
      });

      setFormData({
        name_ar: "",
        category: "",
        description: "",
        price: "",
        image_url: null,
      });
      setImagePreview(null);
    } catch {
      toast({
        title: "Error",
        description: "Failed to add falcon",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Falcons Management</h1>
      </div>

      {/* Create Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Falcon</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name_ar">Name (Arabic)</Label>
              <Input
                id="name_ar"
                value={formData.name_ar}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name_ar: e.target.value }))
                }
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, price: e.target.value }))
                }
              />
            </div>
            <div>
              <Label htmlFor="image">Image</Label>
              <div className="flex items-center gap-3">
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <ImagePlus className="h-5 w-5 text-muted-foreground" />
              </div>
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-40 h-40 object-cover rounded"
                  />
                </div>
              )}
            </div>
            <Button type="submit" className="bg-gradient-primary">
              <Plus className="mr-2 h-4 w-4" /> Add Falcon
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Falcons List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {falcons.map((falcon) => (
          <Card key={falcon.id}>
            <img
              src={falcon.image_url}
              alt={falcon.name_ar}
              className="w-full h-40 object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect width='100%25' height='100%25' fill='%23F3F4F6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239CA3AF' font-size='20'%3ENo Image%3C/text%3E%3C/svg%3E";
              }}
            />
            <CardHeader>
              <CardTitle>{falcon.name_ar}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{falcon.category}</p>
              <p className="text-sm">{falcon.description}</p>
              <p className="font-bold">{falcon.price} SAR</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
