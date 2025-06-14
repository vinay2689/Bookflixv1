import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-dark-bg via-dark-card to-dark-bg py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Discover Stories<br />
              <span className="brand-primary">Through Film</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Experience books like never before with movie-style trailers,
              comprehensive reviews, and direct access to both books and their adaptations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-brand-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors">
                <Play className="mr-2 h-4 w-4" />
                Watch Featured Trailer
              </Button>
              <Button variant="outline" className="border-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                Browse Library
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&h=600"
                alt="Featured book trailer thumbnail"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                <Button className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-6 hover:bg-opacity-30 transition-all">
                  <Play className="text-white h-6 w-6 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
