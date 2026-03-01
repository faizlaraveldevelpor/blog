import { IoSearchOutline } from "react-icons/io5";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useSearchQuery } from "../Redux/Api";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import BlogCard from "../Components/shared/BlogCard";
import EmptyState from "../Components/shared/EmptyState";
import { debounce } from "../utils/animations";

function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  
  const { data, isLoading } = useSearchQuery(debouncedSearch || "");

  // Debounce search input
  useEffect(() => {
    const debouncedUpdate = debounce((value) => {
      setDebouncedSearch(value);
    }, 500);

    debouncedUpdate(searchInput);
  }, [searchInput]);

  const blogs = data?.find_blog || [];
  const hasResults = blogs.length > 0;
  const hasSearched = debouncedSearch.length > 0;

  return (
    <div className="min-h-screen bg-brand-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* Header */}
        <section className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-brand-primary font-merriweather mb-3">
            Search Articles
          </h1>
          <p className="text-brand-muted text-sm md:text-base mb-6">
            Find the stories that matter to you
          </p>
          
          {/* Search Input */}
          <div className="relative flex items-center group">
            <HiMagnifyingGlass className="absolute left-4 text-2xl text-brand-muted group-focus-within:text-brand-accent transition-colors" />
            <input 
              type="text" 
              className="w-full h-14 pl-14 pr-4 border-2 border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all text-base md:text-lg shadow-sm hover:shadow-md" 
              placeholder="Search for articles, topics, or keywords..." 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            {isLoading && (
              <div className="absolute right-4">
                <div className="w-5 h-5 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>

          {/* Search Stats */}
          {hasSearched && !isLoading && (
            <p className="text-sm text-brand-muted mt-3">
              {hasResults ? (
                <>Found <span className="font-semibold text-brand-primary">{blogs.length}</span> {blogs.length === 1 ? 'result' : 'results'} for "{debouncedSearch}"</>
              ) : (
                <>No results found for "{debouncedSearch}"</>
              )}
            </p>
          )}
        </section>

        {/* Results */}
        <div>
          {!hasSearched ? (
            <EmptyState 
              title="Start Searching"
              description="Type something in the search box above to find articles"
              icon={IoSearchOutline}
            />
          ) : isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="card h-80">
                    <div className="h-48 bg-slate-200 rounded-t-xl" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-slate-200 rounded w-3/4" />
                      <div className="h-4 bg-slate-200 rounded w-1/2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : hasResults ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
              {blogs.map((blog) => (
                <BlogCard 
                  key={blog._id} 
                  blog={blog} 
                  variant="grid"
                  showAuthor={true}
                  showStats={true}
                />
              ))}
            </div>
          ) : (
            <EmptyState 
              title="No Results Found"
              description="Try searching with different keywords or check your spelling"
              icon={IoSearchOutline}
            />
          )}
        </div>

        {/* Popular Searches / Suggestions */}
        {!hasSearched && (
          <section className="mt-12">
            <h3 className="text-lg font-bold text-brand-primary mb-4">Popular Topics</h3>
            <div className="flex flex-wrap gap-2">
              {['Technology', 'Science', 'Politics', 'Health', 'Business', 'Education'].map((topic) => (
                <button
                  key={topic}
                  onClick={() => setSearchInput(topic)}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-brand-primary hover:bg-brand-accent hover:text-white hover:border-brand-accent transition-all"
                >
                  {topic}
                </button>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Search;
