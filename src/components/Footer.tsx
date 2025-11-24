import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-footer text-footer-foreground mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">AccentsHub</h3>
            <p className="text-sm opacity-90">
              Your favorite home & digital accessories, now in style!
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm hover:text-accent transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-sm hover:text-accent transition-colors">
                  Features
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li className="text-sm">Contact Us</li>
              <li className="text-sm">Shipping Info</li>
              <li className="text-sm">Returns</li>
              <li className="text-sm">FAQ</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4" />
                info@accentshub.com
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4" />
                123 Style Street
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-footer-foreground/20 mt-8 pt-6 text-center text-sm opacity-90">
          <p>&copy; {new Date().getFullYear()} AccentsHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
