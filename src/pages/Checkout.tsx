import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrderSummary from "@/components/OrderSummary";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const cities = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Sialkot",
  "Gujranwala",
];

const countries = [
  "Pakistan",
  "India",
  "Bangladesh",
  "Sri Lanka",
  "Nepal",
];

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const [emailOffers, setEmailOffers] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [country, setCountry] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [cityInput, setCityInput] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);
  const [shippingMethod, setShippingMethod] = useState("cod");
  const [billingAddress, setBillingAddress] = useState("same");

  const handleCompleteOrder = () => {
    if (!email || !firstName || !lastName || !address || !phone || !selectedCity || !country) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Order Placed!",
      description: "Your order has been placed successfully.",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Form */}
          <div className="flex-1 max-w-2xl">
            {/* Login Icon */}
            <div className="flex justify-end mb-6">
          <button
            onClick={() => navigate("/auth")}
            className="flex items-center gap-2 text-foreground hover:text-secondary transition-colors"
          >
            <User className="h-6 w-6" />
            <span className="text-sm">Login</span>
          </button>
        </div>

        {/* Contact Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Contact</h2>
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
            <div className="flex items-center space-x-2">
              <Checkbox
                id="emailOffers"
                checked={emailOffers}
                onCheckedChange={(checked) => setEmailOffers(checked as boolean)}
              />
              <Label htmlFor="emailOffers" className="text-sm text-muted-foreground">
                Email me with news and offers
              </Label>
            </div>
          </div>
        </section>

        {/* Delivery Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Delivery</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-muted-foreground mb-2 block">Select City</Label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger className="w-full bg-background">
                    <SelectValue placeholder="Select City" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border border-border z-50">
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground mb-2 block">Country/Region</Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger className="w-full bg-background">
                    <SelectValue placeholder="Country/Region" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border border-border z-50">
                    {countries.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Input
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <Input
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  placeholder="City"
                  value={cityInput}
                  onChange={(e) => setCityInput(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Please select city from dropdown
                </p>
              </div>
              <Input
                placeholder="Postal Code (optional)"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>

            <Input
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <div className="flex items-center space-x-2">
              <Checkbox
                id="saveInfo"
                checked={saveInfo}
                onCheckedChange={(checked) => setSaveInfo(checked as boolean)}
              />
              <Label htmlFor="saveInfo" className="text-sm text-muted-foreground">
                Save this information for next time
              </Label>
            </div>
          </div>
        </section>

        {/* Shipping Method Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Shipping Method</h2>
          <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="space-y-3">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-card">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod" className="text-foreground cursor-pointer">
                  Delivery + COD Fee
                </Label>
              </div>
              <span className="font-semibold text-foreground">Rs 250.00</span>
            </div>

            <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-card">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="free" id="free" />
                <div>
                  <Label htmlFor="free" className="text-foreground cursor-pointer">
                    Free Delivery | Online Payment
                  </Label>
                  <p className="text-xs text-muted-foreground">5–7 business days</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm text-muted-foreground line-through block">Rs 250.00</span>
                <span className="font-semibold text-accent">FREE</span>
              </div>
            </div>
          </RadioGroup>
        </section>

        {/* Payment Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Payment</h2>
          <p className="text-sm text-muted-foreground mb-4">
            All transactions are secure and encrypted.
          </p>
          <div className="p-4 border border-border rounded-lg bg-card">
            <h3 className="font-medium text-foreground mb-2">Cash on Delivery (COD)</h3>
            <p className="text-sm text-muted-foreground">
              Cash handling charges Rs 50 apply on all COD orders.
            </p>
          </div>
        </section>

        {/* Billing Address Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Billing Address</h2>
          <RadioGroup value={billingAddress} onValueChange={setBillingAddress} className="space-y-3">
            <div className="flex items-center space-x-3 p-4 border border-border rounded-lg bg-card">
              <RadioGroupItem value="same" id="same" />
              <Label htmlFor="same" className="text-foreground cursor-pointer">
                Same as shipping address
              </Label>
            </div>
            <div className="flex items-center space-x-3 p-4 border border-border rounded-lg bg-card">
              <RadioGroupItem value="different" id="different" />
              <Label htmlFor="different" className="text-foreground cursor-pointer">
                Use a different billing address
              </Label>
            </div>
          </RadioGroup>
        </section>

            {/* Complete Order Button */}
            <Button
              onClick={handleCompleteOrder}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg font-semibold"
            >
              Complete Order
            </Button>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-96">
            <div className="lg:sticky lg:top-8">
              <OrderSummary shippingCost={shippingMethod === "cod" ? 250 : 0} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
