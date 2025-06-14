import { useQuery } from "@tanstack/react-query";
import { Book } from "@shared/schema";
import BookCard from "@/components/BookCard";
import { Skeleton } from "@/components/ui/skeleton";

interface BookGridProps {
  selectedGenre: string;
  searchQuery: string;
  onBookSelect: (book: Book) => void;
}

export default function BookGrid({ selectedGenre, searchQuery, onBookSelect }: BookGridProps) {
  const { data: books, isLoading } = useQuery<Book[]>({
    queryKey: ["/api/books", selectedGenre, searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (selectedGenre !== "all") params.append("genre", selectedGenre);
      if (searchQuery) params.append("search", searchQuery);
      
      const response = await fetch(`/api/books?${params}`);
      if (!response.ok) throw new Error("Failed to fetch books");
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold mb-8">Trending Books</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-dark-card rounded-xl overflow-hidden">
                <Skeleton className="w-full h-80" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!books || books.length === 0) {
    return (
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold mb-8">No Books Found</h3>
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">
              {searchQuery
                ? `No books found matching "${searchQuery}"`
                : `No books found in ${selectedGenre} category`}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl font-bold mb-8">
          {searchQuery ? `Search Results for "${searchQuery}"` : "Trending Books"}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onClick={() => onBookSelect(book)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
