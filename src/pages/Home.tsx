import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="relative bg-gradient-to-br from-primary via-secondary to-accent text-primary-foreground py-32 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Welcome to AccentsHub
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-95 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200">
              Your favorite home & digital accessories, now in style!
            </p>
            <Link to="/products">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
                Shop Now
              </Button>
            </Link>
          </div>
        </section>

        <section className="py-16 px-4 bg-muted">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose AccentsHub?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏠</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Home Accessories</h3>
                <p className="text-muted-foreground">
                  Elegant and functional accessories to beautify your living space
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💻</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Digital Accessories</h3>
                <p className="text-muted-foreground">
                  Modern tech accessories that blend style with functionality
                </p>
              </div>
              
              <div className="bg-card p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality First</h3>
                <p className="text-muted-foreground">
                  Premium quality products curated for the discerning customer
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
