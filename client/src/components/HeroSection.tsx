import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import heroVideoPath from "@assets/Video_Creation_Dark_Mode_Hero_1749952935587.mp4";

export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

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
              <Button className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-500 hover:via-purple-600 hover:to-blue-700 transition-colors">
                <Play className="mr-2 h-4 w-4" />
                Watch Featured Trailer
              </Button>
              <Button variant="outline" className="border-gradient bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-500 hover:via-purple-600 hover:to-blue-700 transition-colors">
                Browse Library
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
              <video
                ref={videoRef}
                src={heroVideoPath}
                className="w-full h-80 object-cover"
                loop
                muted={false}
                playsInline
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-50 transition-all">
                <Button 
                  onClick={toggleVideo}
                  className="bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-opacity-90 backdrop-blur-sm rounded-full p-6 hover:from-blue-500 hover:via-purple-600 hover:to-blue-700 transition-all transform hover:scale-110"
                >
                  {isPlaying ? (
                    <Pause className="text-white h-6 w-6" fill="white" />
                  ) : (
                    <Play className="text-white h-6 w-6 ml-1" fill="white" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
