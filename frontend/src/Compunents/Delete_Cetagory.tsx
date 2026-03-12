import { useEffect, useState } from "react";
import { useDeletecetagoryMutation, useDeletesubcetagoryMutation, useGet_cetagoryQuery } from "../Redux/Api"
import { toast } from 'react-toastify'
import { HiTrash, HiFolderMinus, HiExclamationTriangle } from "react-icons/hi2"
import Button from "../Components/shared/Button"
import Badge from "../Components/shared/Badge"
import EmptyState from "../Components/shared/EmptyState"

function Delete_Cetagory() {
  let { data } = useGet_cetagoryQuery()
  let [dele_cetagory_fnc, { data: cetagory_data, isLoading: categoryLoading }] = useDeletecetagoryMutation()
  let [dele_sub_cetagory, { data: subcetagory_api_data, isLoading: subcategoryLoading }] = useDeletesubcetagoryMutation()

  let [confirmDelete, setConfirmDelete] = useState(null) // { type: 'category' | 'subcategory', name: string, parent?: string }

  let Delete_Cetagory = (cetagory) => {
    dele_cetagory_fnc(cetagory)
    setConfirmDelete(null)
  }

  let delete_subcetagory = (cetagory, subCetagory) => {
    dele_sub_cetagory({ "cetagory": cetagory, "subCetagory": subCetagory })
    setConfirmDelete(null)
  }

  useEffect(() => {
    if (subcetagory_api_data) {
      if (subcetagory_api_data?.success == false) {
        toast.error(subcetagory_api_data.message)
      }
      if (subcetagory_api_data?.success == true) {
        toast.success(subcetagory_api_data.message)
      }
    }
  }, [subcetagory_api_data])

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

  return (
    <div className="min-h-screen p-6 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-primary mb-2 flex items-center gap-3">
          <HiFolderMinus className="text-red-500" />
          Manage Categories
        </h1>
        <p className="text-brand-muted text-sm">View and delete categories and subcategories</p>
      </div>

      {/* Confirmation Modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scaleIn">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <HiExclamationTriangle className="text-2xl text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-primary">Confirm Deletion</h3>
                <p className="text-sm text-brand-muted">This action cannot be undone</p>
              </div>
            </div>

            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">
                Are you sure you want to delete{' '}
                <span className="font-semibold">
                  {confirmDelete.type === 'subcategory' ? 'subcategory' : 'category'}
                </span>{' '}
                "<strong>{confirmDelete.name}</strong>"?
                {confirmDelete.type === 'category' && (
                  <span className="block mt-2 text-xs">
                    ⚠️ This will also delete all associated subcategories and may affect related blog posts.
                  </span>
                )}
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setConfirmDelete(null)}
                variant="outline"
                fullWidth
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (confirmDelete.type === 'category') {
                    Delete_Cetagory(confirmDelete.name)
                  } else {
                    delete_subcetagory(confirmDelete.parent, confirmDelete.name)
                  }
                }}
                variant="danger"
                fullWidth
                loading={categoryLoading || subcategoryLoading}
                className="flex items-center justify-center gap-2"
              >
                <HiTrash /> Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Categories */}
      <div className="mb-8">
        <div className="card p-6">
          <h2 className="text-xl font-bold text-brand-primary mb-6 flex items-center gap-2">
            <HiFolderMinus className="text-brand-accent" />
            Main Categories ({data?.getCetagory?.length || 0})
          </h2>

          {data?.getCetagory && data.getCetagory.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {data.getCetagory.map((category, idx) => (
                <div
                  key={idx}
                  className="group relative p-5 bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 rounded-xl hover:border-red-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="mb-3">
                    <h3 className="font-semibold text-brand-primary text-lg mb-1">
                      {category.cetagory}
                    </h3>
                    <p className="text-xs text-brand-muted">
                      {category.subCetagory?.length || 0} subcategories
                    </p>
                  </div>

                  <Button
                    onClick={() =>
                      setConfirmDelete({
                        type: 'category',
                        name: category.cetagory,
                      })
                    }
                    variant="danger"
                    size="sm"
                    fullWidth
                    className="flex items-center justify-center gap-2"
                  >
                    <HiTrash /> Delete Category
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Categories"
              description="Create categories first to manage them"
              icon={HiFolderMinus}
            />
          )}
        </div>
      </div>

      {/* Subcategories */}
      <div>
        <div className="card p-6">
          <h2 className="text-xl font-bold text-brand-primary mb-6 flex items-center gap-2">
            <HiTrash className="text-teal-600" />
            All Subcategories
          </h2>

          {data?.getCetagory && data.getCetagory.some((cat) => cat.subCetagory?.length > 0) ? (
            <div className="space-y-6">
              {data.getCetagory.map((category, catIdx) => {
                if (!category.subCetagory || category.subCetagory.length === 0) return null

                return (
                  <div key={catIdx} className="border-l-4 border-brand-accent pl-4">
                    <h3 className="font-bold text-brand-primary mb-3 flex items-center gap-2">
                      <Badge variant="primary">{category.cetagory}</Badge>
                      <span className="text-sm text-brand-muted">
                        ({category.subCetagory.length} subcategories)
                      </span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                      {category.subCetagory.map((sub, subIdx) => (
                        <div
                          key={subIdx}
                          className="group p-4 bg-slate-50 border border-slate-200 rounded-lg hover:border-red-300 hover:shadow-md transition-all duration-200"
                        >
                          <p className="font-medium text-brand-primary mb-3 text-sm">
                            {sub}
                          </p>
                          <Button
                            onClick={() =>
                              setConfirmDelete({
                                type: 'subcategory',
                                name: sub,
                                parent: category.cetagory,
                              })
                            }
                            variant="danger"
                            size="sm"
                            fullWidth
                            className="flex items-center justify-center gap-1 text-xs"
                          >
                            <HiTrash /> Delete
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <EmptyState
              title="No Subcategories"
              description="Add subcategories to your categories first"
              icon={HiTrash}
            />
          )}
        </div>
      </div>

      {/* Warning Notice */}
      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg max-w-4xl">
        <div className="flex gap-3">
          <HiExclamationTriangle className="text-xl text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-amber-900 mb-1">Important Notice</h3>
            <p className="text-xs text-amber-800">
              Deleting a category or subcategory may affect blog posts that are tagged with them. 
              Make sure to reassign posts before deletion or they may become uncategorized.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Delete_Cetagory
