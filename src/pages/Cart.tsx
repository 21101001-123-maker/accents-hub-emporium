import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: string;
  quantity: number;
  product_id: string;
  products: {
    id: string;
    name: string;
    price: number;
    image_url: string | null;
    discount: number;
  };
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }
    setUser(session.user);
    fetchCartItems(session.user.id);
  };

  const fetchCartItems = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("cart_items")
        .select(`
          *,
          products (
            id,
            name,
            price,
            image_url,
            discount
          )
        `)
        .eq("user_id", userId);

      if (error) throw error;
      setCartItems(data || []);
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

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
      const { error } = await supabase
        .from("cart_items")
        .update({ quantity: newQuantity })
        .eq("id", itemId);

      if (error) throw error;

      setCartItems(items =>
        items.map(item =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("id", itemId);

      if (error) throw error;

      setCartItems(items => items.filter(item => item.id !== itemId));
      toast({
        title: "Success",
        description: "Item removed from cart",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.products.price - (item.products.price * item.products.discount / 100);
      return total + (price * item.quantity);
    }, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p>Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartItemsCount={cartItems.length} />
      
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
          
          {cartItems.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground mb-4">Your cart is empty</p>
                <Button onClick={() => navigate("/products")}>Continue Shopping</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => {
                  const finalPrice = item.products.price - (item.products.price * item.products.discount / 100);
                  
                  return (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="w-24 h-24 bg-muted rounded flex items-center justify-center flex-shrink-0">
                            {item.products.image_url ? (
                              <img
                                src={item.products.image_url}
                                alt={item.products.name}
                                className="w-full h-full object-cover rounded"
                              />
                            ) : (
                              <span className="text-3xl">📦</span>
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{item.products.name}</h3>
                            <p className="text-accent font-bold">${finalPrice.toFixed(2)}</p>
                            
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  -
                                </Button>
                                <Input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                  className="w-16 text-center"
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  +
                                </Button>
                              </div>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <p className="font-bold text-lg">
                              ${(finalPrice * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              
              <div>
                <Card className="sticky top-20">
                  <CardContent className="p-6 space-y-4">
                    <h2 className="text-2xl font-bold">Order Summary</h2>
                    
                    <div className="space-y-2 border-t pt-4">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${calculateTotal().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Shipping</span>
                        <span>Calculated at checkout</span>
                      </div>
                      <div className="flex justify-between text-xl font-bold border-t pt-2">
                        <span>Total</span>
                        <span className="text-accent">${calculateTotal().toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <Button className="w-full" size="lg" onClick={() => navigate("/checkout")}>
                      Proceed to Checkout
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => navigate("/products")}
                    >
                      Continue Shopping
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
