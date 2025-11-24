import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, Shield, Heart, Headphones } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Truck,
      title: "Fast Shipping",
      description: "Get your orders delivered quickly with our express shipping options",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "Shop with confidence using our secure payment gateway",
    },
    {
      icon: Heart,
      title: "Quality Products",
      description: "Every product is carefully selected for quality and style",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Our customer service team is always here to help",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-center">Our Features</h1>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Discover what makes AccentsHub the perfect choice for your home and digital accessory needs
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
                      <feature.icon className="h-8 w-8 text-accent-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-center">Why Choose Us?</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    At AccentsHub, we believe that the right accessories can transform any space. Whether you're looking to add personality to your home or enhance your digital setup, we've curated a collection that combines style with functionality.
                  </p>
                  <p>
                    Our team carefully selects each product to ensure it meets our high standards for quality and design. We work with trusted manufacturers and artisans to bring you unique pieces that you won't find anywhere else.
                  </p>
                  <p>
                    Customer satisfaction is our top priority. From the moment you browse our catalog to the day your order arrives, we're committed to providing an exceptional shopping experience.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Features;
