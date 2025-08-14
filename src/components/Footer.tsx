import React from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import pragati from "../images/maxresdefault-removebg-preview.png"

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-6">
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex items-center justify-center">
                <img src={pragati} alt="Pragati Logo" className="w-28 h-20 object-contain" />
              </div>
              <div>
                <h3 className="text-xl font-bold">ALVA'S PRAGATI</h3>
                <p className="text-sm text-gray-400">ಆಳ್ವಾಸ್ ಪ್ರಗತಿ</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Connecting talent with opportunity through comprehensive placement services and career guidance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Companies</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Jobs</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-purple-400 mt-1" />
                <div className="text-gray-300">
                  <p>Alva's Education Foundation</p>
                  <p>Moodbidri, Karnataka</p>
                  <p>India - 574227</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-purple-400" />
                <div className="text-gray-300">
                  <p><a href="tel:+919663190590" className="hover:underline">+91-9663190590</a></p>
                  <p><a href="tel:+919008907716" className="hover:underline">+91-9008907716</a></p>
                  <p><a href="tel:+918050585606" className="hover:underline">+91-8050585606</a></p>
                  <p><a href="tel:+919611686148" className="hover:underline">+91-9611686148</a></p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-purple-400" />
                <div className="text-gray-300">
                  <p>pragati@alvas.org</p>
                  <p>placement@alvas.org</p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div className="w-full max-w-md mx-auto px-4">
  <h4 className="text-lg font-semibold mb-6 text-center sm:text-left">Alva's Education Foundation</h4>
  <div className="w-full rounded-lg overflow-hidden">
    <iframe
      title="Alva's Pragati Location"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.478939239629!2d74.9910254758581!3d13.068804512738025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba4aaec8dcb24b3%3A0x93a7a8793afa6823!2sAlva%E2%80%99s%20Education%20Foundation!5e0!3m2!1sen!2sin!4v1753417371224!5m2!1sen!2sin"
      width="100%"
      height="300"
      style={{ border: 0 }}
      allowFullScreen={false}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  </div>
</div>
</div>


        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 Alva's Education Foundation. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
