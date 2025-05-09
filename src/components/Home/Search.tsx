import { useState } from "react";
import { MapPinIcon } from "../icons/mapPinIcon";
import { SearchIcon } from "../icons/searchIcon";

interface SearchProps {
  isLoading: boolean;
  onSearch: (query: string) => void;
}

export const Search = ({ isLoading, onSearch }: SearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    onSearch(searchQuery.trim());
    setSearchQuery("");
  };
  return (
    <form
      onSubmit={handleSearch}
      className={`transition-all dark:text-white duration-500 ease-in-out max-w-xl mx-auto mb-8`}
    >
      <div className="relative flex items-center">
        <MapPinIcon className="absolute left-3 text-slate-400" />
        <input
          type="text"
          disabled={isLoading}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a city..."
          required
          className="search-field"
        />
        <button type="submit" className="form-button" disabled={isLoading}>
          {isLoading ? (
            "Searching..."
          ) : (
            <div className="flex items-center p-2">
              <SearchIcon className="mr-2" />
              Search
            </div>
          )}
        </button>
      </div>
    </form>
  );
};
