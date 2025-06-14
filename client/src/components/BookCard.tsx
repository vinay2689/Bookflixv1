import { Star, StarHalf } from "lucide-react";
import { Book } from "@shared/schema";

interface BookCardProps {
  book: Book;
  onClick: () => void;
}

export default function BookCard({ book, onClick }: BookCardProps) {
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

  return (
    <div
      className="bg-dark-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
      onClick={onClick}
    >
      <img
        src={book.coverImageUrl || "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600"}
        alt={`${book.title} cover`}
        className="w-full h-80 object-cover"
      />
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
