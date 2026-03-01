import { useEffect, useRef, useState } from "react"
import { useCreate_cetagoryMutation, useCreate_subcetagoryMutation, useGet_cetagoryQuery } from "../../Redux/Api"
import { toast } from 'react-toastify'
import { HiTag, HiPlus, HiFolderPlus, HiCheckCircle } from "react-icons/hi2"
import { MdArrowDropDown } from "react-icons/md"
import Button from "../../Components/shared/Button"
import Badge from "../../Components/shared/Badge"

function Create_cetagory() {
  let [create_cetagory_fnc, { data: cetagory_data, isLoading: categoryLoading }] = useCreate_cetagoryMutation()
  let [create_sub_cetagoryfnc, { data: subcetagorydata, isLoading: subcategoryLoading }] = useCreate_subcetagoryMutation()
  let { data: cetagory_list_data } = useGet_cetagoryQuery()

  let [categoryName, setCategoryName] = useState("")
  let [subcategoryName, setSubcategoryName] = useState("")
  let [selectedCategory, setSelectedCategory] = useState("")
  let [showCategoryDropdown, setShowCategoryDropdown] = useState(false)

  let create_cetagory = () => {
    if (!categoryName.trim()) {
      toast.error("Please enter a category name")
      return
    }
    create_cetagory_fnc({ "cetagory": categoryName.trim() })
    setCategoryName("")
  }

  let create_subcetagory = () => {
    if (!selectedCategory.trim()) {
      toast.error("Please select a parent category")
      return
    }
    if (!subcategoryName.trim()) {
      toast.error("Please enter a subcategory name")
      return
    }
    create_sub_cetagoryfnc({ "subCetagory": subcategoryName.trim(), "cetagory": selectedCategory })
    setSubcategoryName("")
  }

  useEffect(() => {
    if (cetagory_data) {
      if (cetagory_data?.success == false) {
        toast.error(cetagory_data.message)
      }
      if (cetagory_data?.success == true) {
        toast.success(cetagory_data.message)
      }
    }
  }, [cetagory_data])

  useEffect(() => {
    if (subcetagorydata) {
      if (subcetagorydata?.success == true) {
        toast.success(subcetagorydata.message)
      }
      if (subcetagorydata?.success == false) {
        toast.error(subcetagorydata.message)
      }
    }
  }, [subcetagorydata])

  return (
    <div className="min-h-screen p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-primary mb-2 flex items-center gap-3">
          <HiTag className="text-brand-accent" />
          Create Categories
        </h1>
        <p className="text-brand-muted text-sm">Organize your blog content with categories and subcategories</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl">
        {/* Create Main Category */}
        <div className="card p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center">
              <HiFolderPlus className="text-2xl text-brand-accent" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-brand-primary">Main Category</h2>
              <p className="text-xs text-brand-muted">Create a new top-level category</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-brand-primary mb-2">
                Category Name
              </label>
              <input
                type="text"
                className="input"
                placeholder="e.g., Technology, Lifestyle, Business"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && create_cetagory()}
              />
              <p className="text-xs text-brand-muted mt-1">
                Choose a descriptive name for your category
              </p>
            </div>

            <Button
              onClick={create_cetagory}
              variant="primary"
              size="lg"
              fullWidth
              loading={categoryLoading}
              className="flex items-center justify-center gap-2"
            >
              <HiPlus /> Create Category
            </Button>
          </div>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">💡 Category Tips</h3>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• Use clear, descriptive names</li>
              <li>• Keep categories broad and general</li>
              <li>• Avoid creating too many categories</li>
              <li>• Use subcategories for specific topics</li>
            </ul>
          </div>
        </div>

        {/* Create Subcategory */}
        <div className="card p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center">
              <HiTag className="text-2xl text-teal-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-brand-primary">Subcategory</h2>
              <p className="text-xs text-brand-muted">Add a subcategory to an existing category</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Parent Category Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-brand-primary mb-2">
                Parent Category
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="w-full input text-left flex items-center justify-between group"
                >
                  <span className={selectedCategory ? 'text-brand-primary font-semibold' : 'text-brand-muted'}>
                    {selectedCategory || "Select parent category"}
                  </span>
                  <MdArrowDropDown className={`text-2xl text-brand-muted transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
                </button>

                {showCategoryDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto cusSc z-50">
                    {cetagory_list_data?.getCetagory && cetagory_list_data.getCetagory.length > 0 ? (
                      cetagory_list_data.getCetagory.map((data, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setSelectedCategory(data.cetagory)
                            setShowCategoryDropdown(false)
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0 text-sm font-medium text-brand-primary"
                        >
                          {data.cetagory}
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-sm text-brand-muted text-center">
                        No categories found. Create a main category first.
                      </div>
                    )}
                  </div>
                )}
              </div>
              {selectedCategory && (
                <Badge variant="primary" className="mt-2">{selectedCategory}</Badge>
              )}
            </div>

            {/* Subcategory Name */}
            <div>
              <label className="block text-sm font-semibold text-brand-primary mb-2">
                Subcategory Name
              </label>
              <input
                type="text"
                className="input"
                placeholder="e.g., AI & Machine Learning, Fashion, Startups"
                value={subcategoryName}
                onChange={(e) => setSubcategoryName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && create_subcetagory()}
                disabled={!selectedCategory}
              />
              <p className="text-xs text-brand-muted mt-1">
                Subcategories help organize specific topics within a category
              </p>
            </div>

            <Button
              onClick={create_subcetagory}
              variant="primary"
              size="lg"
              fullWidth
              loading={subcategoryLoading}
              disabled={!selectedCategory}
              className="flex items-center justify-center gap-2"
            >
              <HiPlus /> Create Subcategory
            </Button>
          </div>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-teal-50 border border-teal-200 rounded-lg">
            <h3 className="text-sm font-semibold text-teal-900 mb-2">✨ Subcategory Best Practices</h3>
            <ul className="text-xs text-teal-800 space-y-1">
              <li>• Keep subcategories specific and focused</li>
              <li>• Ensure they relate to the parent category</li>
              <li>• Use them for niche topics</li>
              <li>• Avoid redundant names</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Existing Categories Overview */}
      {cetagory_list_data?.getCetagory && cetagory_list_data.getCetagory.length > 0 && (
        <div className="mt-8 max-w-6xl">
          <div className="card p-6">
            <h3 className="text-lg font-bold text-brand-primary mb-4 flex items-center gap-2">
              <HiCheckCircle className="text-brand-accent" />
              Existing Categories ({cetagory_list_data.getCetagory.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cetagory_list_data.getCetagory.map((cat, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <HiFolderPlus className="text-brand-accent" />
                    <h4 className="font-semibold text-brand-primary">{cat.cetagory}</h4>
                  </div>
                  {cat.subCetagory && cat.subCetagory.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {cat.subCetagory.map((sub, subIdx) => (
                        <Badge key={subIdx} variant="default" className="text-xs">
                          {sub}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Create_cetagory
