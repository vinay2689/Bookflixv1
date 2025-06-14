import { Star, StarHalf, Play } from "lucide-react";
import { Book } from "@shared/schema";
import { useState } from "react";

interface BookCardProps {
  book: Book;
  onClick: () => void;
}

export default function BookCard({ book, onClick }: BookCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-yellow-400" />);
    }

    return stars;
  };

  const handleTrailerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(true);
  };

  const getVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/embed\/|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const videoId = book.trailerVideoUrl ? getVideoId(book.trailerVideoUrl) : null;
  const thumbnailUrl = videoId 
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : book.coverImageUrl || "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600";

  return (
    <div
      className="bg-dark-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-80">
        {isPlaying && book.trailerVideoUrl ? (
          <iframe
            src={`${book.trailerVideoUrl}?autoplay=1`}
            title={`${book.title} trailer`}
            className="w-full h-full"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src={thumbnailUrl}
              alt={`${book.title} trailer thumbnail`}
              className="w-full h-full object-cover"
            />
            {book.trailerVideoUrl && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-50 transition-all">
                <button
                  onClick={handleTrailerClick}
                  className="bg-brand-primary bg-opacity-90 backdrop-blur-sm rounded-full p-4 hover:bg-opacity-100 transition-all transform hover:scale-110"
                >
                  <Play className="text-white h-6 w-6 ml-1" fill="white" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <div className="p-4">
        <h4 className="font-bold text-lg mb-2 line-clamp-2">{book.title}</h4>
        <p className="text-gray-400 text-sm mb-2">{book.author}</p>
        <div className="flex items-center mb-2">
          <div className="flex mr-2">
            {renderStars(book.rating)}
          </div>
          <span className="text-sm text-gray-400">
            {book.rating.toFixed(1)} ({book.reviewCount.toLocaleString()})
          </span>
        </div>
        <p className="text-gray-300 text-sm line-clamp-3">{book.synopsis}</p>
      </div>
    </div>
  );
}
