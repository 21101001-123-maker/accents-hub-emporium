import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface CartItem {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price: number;
    discount: number | null;
    image_url: string | null;
  };
}

interface OrderSummaryProps {
  shippingCost: number;
}

const OrderSummary = ({ shippingCost }: OrderSummaryProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("cart_items")
        .select(`
          id,
          quantity,
          product:products (
            id,
            name,
            price,
            discount,
            image_url
          )
        `)
        .eq("user_id", user.id);

      if (error) throw error;

      const formattedItems = data?.map((item: any) => ({
        id: item.id,
        quantity: item.quantity,
        product: item.product,
      })) || [];

      setCartItems(formattedItems);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyDiscount = () => {
    // Simple discount code logic - can be extended
    if (discountCode.toUpperCase() === "SAVE10") {
      setAppliedDiscount(10);
    } else if (discountCode.toUpperCase() === "SAVE20") {
      setAppliedDiscount(20);
    } else {
      setAppliedDiscount(0);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.product.price;
    const discount = item.product.discount || 0;
    const finalPrice = price - (price * discount / 100);
    return sum + (finalPrice * item.quantity);
  }, 0);

  const discountAmount = (subtotal * appliedDiscount) / 100;
  const total = subtotal + shippingCost - discountAmount;

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <p className="text-muted-foreground">Loading order summary...</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      {/* Product Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Order Summary</h3>
        
        {cartItems.length === 0 ? (
          <p className="text-muted-foreground text-sm">No items in cart</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={item.product.image_url || "/placeholder.svg"}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-md border border-border"
                  />
                  <span className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground line-clamp-2">
                    {item.product.name}
                  </p>
                </div>
                <p className="text-sm font-semibold text-foreground">
                  Rs {((item.product.price - (item.product.price * (item.product.discount || 0) / 100)) * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Discount Code */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <Input
            placeholder="Discount code"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className="flex-1"
          />
          <Button
            onClick={handleApplyDiscount}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Apply
          </Button>
        </div>
        {appliedDiscount > 0 && (
          <p className="text-sm text-accent">Discount applied: {appliedDiscount}% off</p>
        )}
      </div>

      {/* Cost Summary */}
      <div className="space-y-3 pt-4 border-t border-border">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="text-foreground">Rs {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="text-foreground">Rs {shippingCost.toFixed(2)}</span>
        </div>
        {appliedDiscount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Discount</span>
            <span className="text-accent">-Rs {discountAmount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-lg font-semibold pt-2 border-t border-border">
          <span className="text-foreground">Total</span>
          <span className="text-foreground">Rs {total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
