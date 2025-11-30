import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

interface ProductForm {
  name: string;
  price: number;
  quantity: number;
  description: string;
  discount: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description: string | null;
  discount: number;
}

const Seller = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  const { register, handleSubmit, reset, setValue } = useForm<ProductForm>({
    defaultValues: {
      name: "",
      price: 0,
      quantity: 0,
      description: "",
      discount: 0,
    },
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ProductForm) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (editingId) {
        const { error } = await supabase
          .from("products")
          .update({
            name: data.name,
            price: data.price,
            quantity: data.quantity,
            description: data.description,
            discount: data.discount,
          })
          .eq("id", editingId);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Product updated successfully",
        });
        setEditingId(null);
      } else {
        const { error } = await supabase
          .from("products")
          .insert({
            name: data.name,
            price: data.price,
            quantity: data.quantity,
            description: data.description,
            discount: data.discount,
            created_by: session?.user.id,
          });

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Product added successfully",
        });
      }
      
      reset();
      fetchProducts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setValue("name", product.name);
    setValue("price", product.price);
    setValue("quantity", product.quantity);
    setValue("description", product.description || "");
    setValue("discount", product.discount ?? 0);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
      fetchProducts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    reset();
    setEditingId(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8">Seller Dashboard</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side - Product List Table */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <Card>
                <CardHeader>
                  <CardTitle>Product List</CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <p>Loading products...</p>
                  ) : products.length === 0 ? (
                    <p className="text-muted-foreground">No products added yet.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-muted/50">
                            <TableHead>ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Discount</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {products.map((product) => (
                            <TableRow key={product.id}>
                              <TableCell className="font-mono text-xs">{product.id.slice(0, 8)}...</TableCell>
                              <TableCell className="font-medium">{product.name}</TableCell>
                              <TableCell>Rs {product.price.toFixed(2)}</TableCell>
                              <TableCell>{product.quantity}</TableCell>
                              <TableCell>{product.discount ?? 0}%</TableCell>
                              <TableCell className="max-w-[150px] truncate">
                                {product.description || "N/A"}
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    onClick={() => handleEdit(product)}
                                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                                  >
                                    Update
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={() => handleDelete(product.id)}
                                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Right Side - Add/Edit Product Form */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <Card>
                <CardHeader>
                  <CardTitle>{editingId ? "Update Product" : "Add Product"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <Label htmlFor="productId">Product ID</Label>
                      <Input 
                        id="productId" 
                        value={editingId || "Auto-generated"} 
                        readOnly 
                        className="bg-muted"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input id="name" {...register("name")} required />
                    </div>
                    
                    <div>
                      <Label htmlFor="price">Price *</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        {...register("price", { valueAsNumber: true })}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="quantity">Quantity *</Label>
                      <Input
                        id="quantity"
                        type="number"
                        {...register("quantity", { valueAsNumber: true })}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="discount">Discount (%)</Label>
                      <Input
                        id="discount"
                        type="number"
                        step="0.01"
                        {...register("discount", { valueAsNumber: true })}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" {...register("description")} rows={3} />
                    </div>
                    
                    <div className="flex gap-2 pt-4">
                      <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                        {editingId ? "Save" : "Add"}
                      </Button>
                      <Button type="button" variant="outline" onClick={handleCancel} className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Seller;
