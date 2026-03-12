import { useState } from "react";
import { useGet_cetagoryQuery, useBlogsQuery } from "../../Redux/Api";
import { Link } from "react-router-dom";
import Badge from "../../Components/shared/Badge";
import Button from "../../Components/shared/Button";
import EmptyState from "../../Components/shared/EmptyState";
import { 
  HiTag, 
  HiFolder, 
  HiFolderOpen, 
  HiMagnifyingGlass, 
  HiPlus, 
  HiTrash,
  HiDocumentText,
  HiChartBar
} from "react-icons/hi2";

function All_cetagories() {
  const { data, isLoading } = useGet_cetagoryQuery();
  const { data: blogsData } = useBlogsQuery();
  const [searchTerm, setSearchTerm] = useState("");

  const categories = data?.getCetagory || [];
  const blogs = blogsData?.get_blog || [];

  // Calculate blog count per category
  const getCategoryBlogCount = (categoryName) => {
    return blogs.filter(blog => blog.cetagory === categoryName).length;
  };

  // Calculate subcategory blog count
  const getSubcategoryBlogCount = (categoryName, subcategoryName) => {
    return blogs.filter(
      blog => blog.cetagory === categoryName && blog.subcetagory === subcategoryName
    ).length;
  };

  // Filter categories by search term
  const filteredCategories = categories.filter((cat) => {
    const searchLower = searchTerm.toLowerCase();
    const categoryMatch = cat.cetagory?.toLowerCase().includes(searchLower);
    const subcategoryMatch = cat.subCetagory?.some(sub => 
      sub.toLowerCase().includes(searchLower)
    );
    return categoryMatch || subcategoryMatch;
  });

  if (isLoading) {
    return (
      <div className="p-6 md:p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded w-48" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-40 bg-slate-200 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const totalCategories = categories.length;
  const totalSubcategories = categories.reduce((sum, cat) => sum + (cat.subCetagory?.length || 0), 0);
  const totalBlogs = blogs.length;

  return (
    <div className="min-h-screen p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
          <div>
            <h1 className="text-3xl font-bold text-brand-primary mb-2 flex items-center gap-3">
              <HiTag className="text-brand-accent" />
              All Categories
            </h1>
            <p className="text-brand-muted text-sm">Browse, search, and manage your blog categories</p>
          </div>
          <div className="flex gap-2">
            <Link to="/create/cetagory">
              <Button variant="primary" className="flex items-center gap-2">
                <HiPlus /> Create Category
              </Button>
            </Link>
            <Link to="/delete/cetagory">
              <Button variant="danger" className="flex items-center gap-2">
                <HiTrash /> Manage
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="card p-6 bg-gradient-to-br from-brand-accent/10 to-teal-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-brand-muted mb-1">Main Categories</p>
              <p className="text-3xl font-bold text-brand-primary">{totalCategories}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-brand-accent/20 flex items-center justify-center">
              <HiFolder className="text-2xl text-brand-accent" />
            </div>
          </div>
        </div>

        <div className="card p-6 bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-700 mb-1">Subcategories</p>
              <p className="text-3xl font-bold text-purple-600">{totalSubcategories}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center">
              <HiFolderOpen className="text-2xl text-purple-600" />
            </div>
          </div>
        </div>

        <div className="card p-6 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700 mb-1">Total Blogs</p>
              <p className="text-3xl font-bold text-blue-600">{totalBlogs}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center">
              <HiDocumentText className="text-2xl text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="card p-4 mb-6">
        <div className="relative">
          <HiMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-brand-muted" />
          <input
            type="text"
            className="input pl-12"
            placeholder="Search categories and subcategories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Categories Display */}
      {filteredCategories.length === 0 ? (
        <div className="card p-12">
          <EmptyState
            title={searchTerm ? "No categories found" : "No categories yet"}
            description={searchTerm ? "Try adjusting your search terms" : "Get started by creating your first category"}
            icon={HiFolder}
          />
        </div>
      ) : (
        <div className="space-y-6">
          {filteredCategories.map((category, idx) => {
            const blogCount = getCategoryBlogCount(category.cetagory);
            
            return (
              <div 
                key={idx} 
                className="card p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-brand-accent"
              >
                {/* Category Header */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-brand-accent to-teal-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <HiFolder className="text-3xl text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-2xl font-bold text-brand-primary mb-2">
                        {category.cetagory}
                      </h2>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-brand-muted">
                        <span className="flex items-center gap-1">
                          <HiFolderOpen className="text-brand-accent" />
                          {category.subCetagory?.length || 0} subcategories
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <HiDocumentText className="text-brand-accent" />
                          {blogCount} blogs
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="flex-shrink-0">
                    <div className="text-center p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="flex items-center gap-2 text-brand-accent mb-1">
                        <HiChartBar className="text-xl" />
                      </div>
                      <p className="text-2xl font-bold text-brand-primary">{blogCount}</p>
                      <p className="text-xs text-brand-muted">blogs</p>
                    </div>
                  </div>
                </div>

                {/* Subcategories Section */}
                {category.subCetagory && category.subCetagory.length > 0 ? (
                  <div className="border-t border-slate-200 pt-4">
                    <div className="flex items-center gap-2 mb-4">
                      <HiFolderOpen className="text-brand-accent" />
                      <h3 className="text-sm font-semibold text-brand-primary uppercase tracking-wide">
                        Subcategories ({category.subCetagory.length})
                      </h3>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {category.subCetagory.map((sub, subIdx) => {
                        const subBlogCount = getSubcategoryBlogCount(category.cetagory, sub);
                        
                        return (
                          <div
                            key={subIdx}
                            className="group p-4 bg-slate-50 border border-slate-200 rounded-lg hover:border-brand-accent hover:shadow-md transition-all duration-200"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-brand-primary mb-1 truncate group-hover:text-brand-accent transition-colors">
                                  {sub}
                                </p>
                                <p className="text-xs text-brand-muted flex items-center gap-1">
                                  <HiDocumentText className="text-brand-accent" />
                                  {subBlogCount} {subBlogCount === 1 ? 'blog' : 'blogs'}
                                </p>
                              </div>
                              <Badge variant="primary" className="text-xs flex-shrink-0">
                                {subBlogCount}
                              </Badge>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="border-t border-slate-200 pt-4">
                    <p className="text-sm text-brand-muted italic flex items-center gap-2">
                      <HiFolderOpen className="opacity-50" />
                      No subcategories added yet
                    </p>
                  </div>
                )}

                {/* Category Actions */}
                <div className="flex items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-200">
                  <div className="text-xs text-brand-muted">
                    Category ID: <span className="font-mono bg-slate-100 px-2 py-1 rounded">{category._id || idx}</span>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/blogs/${category.cetagory}`}>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <HiDocumentText /> View Blogs ({blogCount})
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Results Counter */}
      {searchTerm && filteredCategories.length > 0 && (
        <div className="mt-6 text-center text-sm text-brand-muted">
          Showing {filteredCategories.length} of {categories.length} categories
        </div>
      )}

      {/* Info Box */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-4xl">
        <div className="flex gap-3">
          <HiTag className="text-xl text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-blue-900 mb-1">💡 Category Management Tips</h3>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• Categories help organize your content and improve navigation</li>
              <li>• Use subcategories to create more specific content groupings</li>
              <li>• Assign categories to blogs for better content discovery</li>
              <li>• Regularly review and consolidate unused categories</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default All_cetagories;
