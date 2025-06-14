import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoryTabs from "@/components/CategoryTabs";
import BookGrid from "@/components/BookGrid";
import CreatorMode from "@/components/CreatorMode";
import BookDetailModal from "@/components/BookDetailModal";
import { Book } from "@shared/schema";

export default function Home() {
  const [isCreatorMode, setIsCreatorMode] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleModeToggle = () => {
    setIsCreatorMode(!isCreatorMode);
  };

  const handleBookSelect = (book: Book) => {
    setSelectedBook(book);
  };

  const handleCloseBookDetail = () => {
    setSelectedBook(null);
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <Header
        isCreatorMode={isCreatorMode}
        onModeToggle={handleModeToggle}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main>
        {isCreatorMode ? (
          <CreatorMode />
        ) : (
          <>
            <HeroSection />
            <CategoryTabs
              selectedGenre={selectedGenre}
              onGenreChange={setSelectedGenre}
            />
            <BookGrid
              selectedGenre={selectedGenre}
              searchQuery={searchQuery}
              onBookSelect={handleBookSelect}
            />
          </>
        )}
      </main>

      {selectedBook && (
        <BookDetailModal
          book={selectedBook}
          isOpen={!!selectedBook}
          onClose={handleCloseBookDetail}
        />
      )}
    </div>
  );
}
