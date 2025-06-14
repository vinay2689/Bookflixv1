import { Search, Bell, UserCircle, Edit, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  isCreatorMode: boolean;
  onModeToggle: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({
  isCreatorMode,
  onModeToggle,
  searchQuery,
  onSearchChange,
}: HeaderProps) {
  return (
    <header className="bg-dark-card border-b border-dark-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold brand-primary">BookOrigins</h1>
            <span className="ml-2 text-sm text-gray-400 hidden sm:inline">
              Where Stories Come to Life
            </span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search books, authors, genres..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-dark-bg border-dark-border rounded-lg pl-10 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Mode Toggle & Actions */}
          <div className="flex items-center space-x-4">
            <Button
              onClick={onModeToggle}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isCreatorMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-brand-primary text-white hover:bg-purple-600"
              }`}
            >
              {isCreatorMode ? (
                <><Book className="mr-2 h-4 w-4" />Reader Mode</>
              ) : (
                <><Edit className="mr-2 h-4 w-4" />Creator Mode</>
              )}
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <UserCircle className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
