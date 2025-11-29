import { useState } from "react";
import { Menu, X, Moon, Sun, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "wouter";
import { PropertyIQLogo } from "@/components/property-iq-logo";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/signout", {
        method: "POST",
        credentials: "include"
      });
      
      if (response.ok) {
        // Redirect to home page after successful logout
        window.location.href = "/";
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-950 shadow-sm border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <PropertyIQLogo size="md" showText={true} className="hover:opacity-80 cursor-pointer transition-opacity" />
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            <nav className="hidden md:block">
              <div className="flex items-baseline space-x-4">
                <Link href="/" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Home
                </Link>
                {user && (
                  <Link href="/price-analysis" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Price Analysis
                  </Link>
                )}
                {!user ? (
                  <div className="flex items-center space-x-2">
                    <Link href="/signin">
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Link href="/subscription" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Subscription
                    </Link>
                    <span className="text-sm font-medium text-foreground">
                      Hello, {user.name?.split(' ')[0] || user.firstName || 'User'}!
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLogout}
                      className="text-primary dark:text-primary hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </Button>
                  </div>
                )}
              </div>
            </nav>
            
            <Button
              variant="ghost"
              size="sm"
              className="p-2 rounded-md text-orange-400 hover:text-orange-500 dark:text-orange-300 dark:hover:text-orange-100"
              onClick={toggleTheme}
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden p-2 rounded-md text-orange-400 hover:text-orange-500 dark:text-orange-300 dark:hover:text-orange-100"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-orange-200 dark:border-orange-800">
              <Link href="/" className="text-orange-900 dark:text-orange-100 hover:text-primary block px-3 py-2 rounded-md text-base font-medium transition-colors">
                Home
              </Link>
              {user && (
                <Link href="/price-analysis" className="text-orange-900 dark:text-orange-100 hover:text-primary block px-3 py-2 rounded-md text-base font-medium transition-colors">
                  Price Analysis
                </Link>
              )}
              {!user ? (
                <div className="space-y-2 mt-4 pt-4 border-t border-orange-200 dark:border-orange-800">
                  <Link href="/signin">
                    <Button variant="ghost" className="w-full justify-start text-orange-600 dark:text-orange-300">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link href="/subscription" className="text-orange-900 dark:text-orange-100 hover:text-primary block px-3 py-2 rounded-md text-base font-medium transition-colors">
                    Subscription
                  </Link>
                  <div className="mt-4 pt-4 border-t border-orange-200 dark:border-orange-800">
                    <div className="px-3 py-2 text-sm text-orange-700 dark:text-orange-300">
                      Hello, {user.name?.split(' ')[0] || user.firstName || 'User'}!
                    </div>
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      className="w-full justify-start text-orange-600 dark:text-orange-300"
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
