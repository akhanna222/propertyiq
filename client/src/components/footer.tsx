import { Twitter, Linkedin, Facebook } from "lucide-react";
import { PropertyIQLogo } from "@/components/property-iq-logo";

export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white mt-8 md:mt-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          <div className="col-span-1 md:col-span-2">
            <PropertyIQLogo size="md" showText={true} className="mb-3 md:mb-4" />
            <p className="text-gray-300 dark:text-gray-400 mb-3 md:mb-4 text-sm md:text-base">
              Intelligent property analysis for informed real estate decisions. 
              Comprehensive data aggregation from trusted Irish sources.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Platform</h4>
            <ul className="space-y-2 text-gray-300 dark:text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">Property Search</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">Market Analytics</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">Investment Tools</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">API Access</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Support</h4>
            <ul className="space-y-2 text-gray-300 dark:text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">Contact Support</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">Data Sources</a></li>
              <li><a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 dark:border-gray-800 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-gray-400 dark:text-gray-500">
          <p className="text-xs md:text-sm mb-2">&copy; 2025 PropertyIQ. All rights reserved.</p>
          <p className="text-xs">Part of Theo Khanna Limited | Company Number: 756311</p>
          <p className="text-xs mt-2">Data sources: CSO.ie, Property Price Register, Google Maps API</p>
        </div>
      </div>
    </footer>
  );
}
