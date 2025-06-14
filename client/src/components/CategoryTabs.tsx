import { Button } from "@/components/ui/button";

interface CategoryTabsProps {
  selectedGenre: string;
  onGenreChange: (genre: string) => void;
}

const genres = [
  { id: "all", label: "All" },
  { id: "Fantasy", label: "Fantasy" },
  { id: "Romance", label: "Romance" },
  { id: "Science Fiction", label: "Sci-Fi" },
  { id: "Mystery", label: "Mystery" },
  { id: "Thriller", label: "Thriller" },
  { id: "Historical", label: "Historical" },
];

export default function CategoryTabs({ selectedGenre, onGenreChange }: CategoryTabsProps) {
  return (
    <section className="py-8 bg-dark-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-4 justify-center">
          {genres.map((genre) => (
            <Button
              key={genre.id}
              onClick={() => onGenreChange(genre.id)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedGenre === genre.id
                  ? "bg-brand-primary text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {genre.label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
