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
          className="pl-10 py-5 rounded-full w-full dark:border-slate-200 border-2 focus:outline-none dark:placeholder:text-slate-400 placeholder:text-slate-800 focus:border-sky-600 border-slate-700"
        />
        <button
          type="submit"
          className="absolute right-1 bg-sky-600 hover:bg-sky-700 text-white rounded-full px-4 py-2"
          disabled={isLoading}
        >
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
