import { useQuery } from "@tanstack/react-query";
import { X, Play, ShoppingCart, Heart, Star, StarHalf } from "lucide-react";
import { Book, BookWithReviews } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface BookDetailModalProps {
  book: Book;
  isOpen: boolean;
  onClose: () => void;
}

export default function BookDetailModal({ book, isOpen, onClose }: BookDetailModalProps) {
  const { data: bookWithReviews, isLoading } = useQuery<BookWithReviews>({
    queryKey: ["/api/books", book.id],
    queryFn: async () => {
      const response = await fetch(`/api/books/${book.id}`);
      if (!response.ok) throw new Error("Failed to fetch book details");
      return response.json();
    },
    enabled: isOpen,
  });

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

  const handlePurchase = () => {
    if (book.amazonPurchaseUrl) {
      window.open(book.amazonPurchaseUrl, '_blank');
    }
  };

  const handleWatchMovie = () => {
    if (book.movieWatchUrl) {
      window.open(book.movieWatchUrl, '_blank');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-dark-card border-dark-border">
        <DialogHeader className="border-b border-dark-border pb-4">
          <DialogTitle className="text-2xl font-bold text-white">{book.title}</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <Skeleton className="w-full h-96 rounded-xl mb-4" />
                <Skeleton className="w-full h-40 rounded-xl mb-4" />
                <div className="space-y-3">
                  <Skeleton className="w-full h-12" />
                  <Skeleton className="w-full h-12" />
                  <Skeleton className="w-full h-12" />
                </div>
              </div>
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <Skeleton className="h-8 w-1/3 mb-4" />
                  <Skeleton className="h-6 w-1/2 mb-4" />
                  <div className="flex gap-2 mb-4">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                </div>
                <div>
                  <Skeleton className="h-6 w-24 mb-3" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            </div>
          </div>
        ) : bookWithReviews ? (
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Book Cover & Trailer */}
              <div className="lg:col-span-1">
                <img
                  src={bookWithReviews.coverImageUrl || "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600"}
                  alt={`${bookWithReviews.title} cover`}
                  className="w-full rounded-xl shadow-lg mb-4"
                />

                {/* Trailer Video */}
                {bookWithReviews.trailerVideoUrl && (
                  <div className="relative bg-gray-900 rounded-xl overflow-hidden mb-4">
                    <div className="aspect-video">
                      <iframe
                        src={bookWithReviews.trailerVideoUrl}
                        title={`${bookWithReviews.title} trailer`}
                        className="w-full h-full"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={handlePurchase}
                    className="w-full bg-green-600 text-white hover:bg-green-700"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Buy on Amazon
                  </Button>
                  <Button
                    onClick={handleWatchMovie}
                    className="w-full bg-blue-600 text-white hover:bg-blue-700"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Watch Movie
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-gray-600 text-white hover:bg-gray-800"
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Add to Wishlist
                  </Button>
                </div>
              </div>

              {/* Book Details */}
              <div className="lg:col-span-2">
                {/* Basic Info */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2 text-white">{bookWithReviews.author}</h3>
                  <div className="flex items-center mb-4">
                    <div className="flex mr-3">
                      {renderStars(bookWithReviews.rating)}
                    </div>
                    <span className="text-lg text-white">{bookWithReviews.rating.toFixed(1)}</span>
                    <span className="text-gray-400 ml-2">
                      ({bookWithReviews.reviewCount.toLocaleString()} reviews)
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                      {bookWithReviews.genre}
                    </Badge>
                  </div>
                </div>

                {/* Synopsis */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-3 text-white">Synopsis</h4>
                  <p className="text-gray-300 leading-relaxed">{bookWithReviews.synopsis}</p>
                </div>

                {/* Reviews Section */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-white">Reviews</h4>

                  {/* Review Filters */}
                  <div className="flex gap-2 mb-4">
                    <Button className="bg-brand-primary text-white text-sm">All Reviews</Button>
                    <Button variant="outline" className="bg-gray-700 text-gray-300 text-sm hover:bg-gray-600">
                      Goodreads
                    </Button>
                    <Button variant="outline" className="bg-gray-700 text-gray-300 text-sm hover:bg-gray-600">
                      Reddit
                    </Button>
                    <Button variant="outline" className="bg-gray-700 text-gray-300 text-sm hover:bg-gray-600">
                      BookOrigins
                    </Button>
                  </div>

                  {/* Reviews List */}
                  <div className="space-y-4">
                    {bookWithReviews.reviews.length === 0 ? (
                      <p className="text-gray-400">No reviews yet. Be the first to review this book!</p>
                    ) : (
                      bookWithReviews.reviews.map((review) => (
                        <div key={review.id} className="bg-dark-bg p-4 rounded-lg">
                          <div className="flex items-center mb-2">
                            <div className="flex mr-2">
                              {renderStars(review.rating)}
                            </div>
                            <span className="font-semibold mr-2 text-white">Anonymous Reader</span>
                            <span className="text-gray-400 text-sm">
                              • {review.source} • {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          {review.comment && (
                            <p className="text-gray-300 text-sm">{review.comment}</p>
                          )}
                        </div>
                      ))
                    )}
                  </div>

                  {bookWithReviews.reviews.length > 0 && (
                    <Button
                      variant="ghost"
                      className="w-full mt-4 brand-primary hover:text-purple-400"
                    >
                      Load More Reviews
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
