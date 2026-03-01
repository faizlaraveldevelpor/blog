import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header'
import Embed from '@editorjs/embed';
import NestedList from '@editorjs/nested-list'
import { useEffect, useRef, useState } from 'react';
import Marker from '@editorjs/marker'
import ImageTool from '@editorjs/image';
import DragDrop from "editorjs-drag-drop";
import Underline from '@editorjs/underline'
import { cetagory_selected } from '../../Redux/api_data_slice';
import { useDispatch, useSelector } from 'react-redux';
import { MdArrowDropDown } from "react-icons/md";
import { HiPhoto, HiDocumentText, HiTag, HiGlobeAlt, HiCheckCircle } from "react-icons/hi2";
import { useCreate_blogMutation, useGet_cetagoryQuery } from '../../Redux/Api'
import { toast } from 'react-toastify'
import Button from '../../Components/shared/Button';
import Badge from '../../Components/shared/Badge';

function Create_blog() {

  let [fnc, { data, isLoading, error }] = useCreate_blogMutation()
  let cetagory_selected_useslator = useSelector((state) => state.Api_data_slice.cetagory_selected)
  let { data: cetagory_data } = useGet_cetagoryQuery()

  let dispatch = useDispatch()
  let main_img_ref = useRef()
  let toast_ref = useRef()
  let editor_js_ref = useRef(null)
  let [blog_data_state, setblog_data_state] = useState({
    title: "",
    blog_thumbnail: "",
    cetagory: "",
    subcetagory: ""
  })

  let [seo_content, setseo_content] = useState({
    metaTitle: "",
    metaDescription: "",
    slug: ""
  })
  let [editor_date, seteditor_date] = useState({
    content: ""
  })

  let ceatgory_state = useSelector((state) => state.Api_data_slice.cetagory)
  let [cetagory_list, setcetagory_list] = useState(false)
  let [subselected_cetagory, setsubsetselected_cetagory] = useState()
  let [subcetagory_list, setsubcetagory_list] = useState(false)

  useEffect(() => {
    setblog_data_state((perv) => ({ ...perv, subcetagory: subselected_cetagory }))
    setblog_data_state((perv) => ({ ...perv, cetagory: cetagory_selected_useslator }))
  }, [cetagory_selected_useslator, subselected_cetagory])

  let editorJs_function = async () => {
    const editor = editor_js_ref.current = new EditorJS({
      holder: "editorjs",
      placeholder: "Start writing your amazing content here...",
      onReady: () => {
        new DragDrop(editor);
      },
      tools: {
        header: {
          class: Header,
          config: {
            placeholder: 'Enter a heading',
            levels: [1, 2, 3, 4, 5, 6],
            defaultLevel: 3
          }
        },
        List: {
          class: NestedList,
          inlineToolbar: true,
          config: {
            defaultStyle: 'unordered'
          }
        },
        Underline: {
          class: Underline,
          shortcut: 'CMD+U'
        },
        Marker: {
          class: Marker,
          shortcut: 'CMD+M'
        },
        Embed: {
          class: Embed,
          inlineToolbar: true,
        },
        Image: {
          class: ImageTool,
          config: {
            uploader: {
              uploadByFile: async (image) => {
                return {
                  success: 1,
                  file: {
                    url: URL.createObjectURL(image),
                    image
                  }
                }
              }
            }
          }
        }
      },
      onChange: async () => {
        let data = await editor.save()
        seteditor_date(data)
      }
    });
  }

  useEffect(() => {
    if (editor_js_ref.current == null) {
      editorJs_function()
    }
  }, [])

  let filter_subcetagories;
  let post_data_of_api = async () => {
    let contentToSend = editor_date
    if (editor_js_ref.current?.save) {
      try {
        contentToSend = await editor_js_ref.current.save()
      } catch (e) {
        toast.error("Could not get editor content")
        return
      }
    }
    if (!contentToSend?.blocks?.length) {
      toast.error("Please add some content in the editor")
      return
    }
    if (!blog_data_state.blog_thumbnail || typeof blog_data_state.blog_thumbnail !== "object") {
      toast.error("Please select a blog thumbnail image")
      return
    }
    if (!blog_data_state.title?.trim()) {
      toast.error("Please enter blog title")
      return
    }
    if (!blog_data_state.cetagory || !blog_data_state.subcetagory) {
      toast.error("Please select category and subcategory")
      return
    }
    const form = new FormData()
    form.append("title", blog_data_state.title.trim())
    form.append("cetagory", blog_data_state.cetagory)
    form.append("subcetagory", blog_data_state.subcetagory)
    form.append("image", blog_data_state.blog_thumbnail)
    form.append("content", JSON.stringify(contentToSend))
    form.append("metaTitle", seo_content.metaTitle || "")
    form.append("metaDescription", seo_content.metaDescription || "")
    form.append("metaSlug", seo_content.slug || "")
    if (contentToSend.blocks) {
      contentToSend.blocks.forEach((data) => {
        if (data.data?.file?.image) {
          form.append("images", data.data.file.image)
        }
      })
    }
    fnc(form)
  }

  useEffect(() => {
    if (isLoading) {
      toast_ref.current = toast.loading("Creating your blog post...")
    }
    if (!isLoading) {
      toast.dismiss(toast_ref.current)
    }
    if (data?.success == true) {
      toast.success(data.message)
    }
    if (data?.success == false) {
      toast.error(data.message)
    }
    if (error?.status === 400 || error?.status === 401) {
      toast.error(error?.data?.message || "Please login first or check your data")
    }
  }, [data, isLoading, error])

  if (ceatgory_state) {
    filter_subcetagories = ceatgory_state.getCetagory.filter((data) => data.cetagory == cetagory_selected_useslator)
  }

  return (
    <div className='min-h-screen p-6 md:p-8'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8'>
        <div>
          <h1 className='text-3xl font-bold text-brand-primary mb-2 flex items-center gap-3'>
            <HiDocumentText className="text-brand-accent" />
            Create New Blog
          </h1>
          <p className='text-brand-muted text-sm'>Share your thoughts with the world</p>
        </div>
        <Button 
          onClick={post_data_of_api} 
          variant="primary"
          size="lg"
          loading={isLoading}
          className="flex items-center gap-2"
        >
          <HiCheckCircle /> Publish Blog
        </Button>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Main Content - 2 columns */}
        <div className='lg:col-span-2 space-y-6'>
          {/* Title Card */}
          <div className='card p-6'>
            <label className='block text-sm font-semibold text-brand-primary mb-2'>
              Blog Title
            </label>
            <input
              type="text"
              className='input text-lg font-semibold'
              placeholder='Enter an engaging title for your blog...'
              value={blog_data_state.title}
              onChange={(e) => setblog_data_state((perv) => ({ ...perv, title: e.target.value }))}
            />
            <p className='text-xs text-brand-muted mt-2'>
              {blog_data_state.title.length} characters
            </p>
          </div>

          {/* Featured Image Card */}
          <div className='card p-6'>
            <label className='flex items-center gap-2 text-sm font-semibold text-brand-primary mb-4'>
              <HiPhoto className="text-brand-accent" />
              Featured Image
            </label>
            
            <input
              type="file"
              ref={main_img_ref}
              className='hidden'
              accept="image/*"
              onChange={(e) => setblog_data_state((perv) => ({ ...perv, blog_thumbnail: e.target.files[0] }))}
            />

            {blog_data_state.blog_thumbnail ? (
              <div className='relative group'>
                <img
                  src={URL.createObjectURL(blog_data_state.blog_thumbnail)}
                  alt="Blog thumbnail preview"
                  className='w-full h-64 object-cover rounded-xl border-2 border-slate-200'
                />
                <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-3'>
                  <Button
                    onClick={() => main_img_ref.current.click()}
                    variant="primary"
                    size="sm"
                  >
                    Change Image
                  </Button>
                  <Button
                    onClick={() => setblog_data_state((perv) => ({ ...perv, blog_thumbnail: "" }))}
                    variant="danger"
                    size="sm"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => main_img_ref.current.click()}
                className='w-full h-64 border-2 border-dashed border-slate-300 rounded-xl hover:border-brand-accent hover:bg-slate-50 transition-all flex flex-col items-center justify-center gap-3 group'
              >
                <div className='w-16 h-16 rounded-full bg-slate-100 group-hover:bg-brand-accent/10 flex items-center justify-center transition-colors'>
                  <HiPhoto className='text-3xl text-slate-400 group-hover:text-brand-accent transition-colors' />
                </div>
                <div className='text-center'>
                  <p className='text-sm font-semibold text-brand-primary'>Click to upload image</p>
                  <p className='text-xs text-brand-muted mt-1'>PNG, JPG, GIF up to 10MB</p>
                </div>
              </button>
            )}
          </div>

          {/* Editor Card */}
          <div className='card p-6'>
            <label className='flex items-center gap-2 text-sm font-semibold text-brand-primary mb-4'>
              <HiDocumentText className="text-brand-accent" />
              Content
            </label>
            <div className='prose max-w-none border border-slate-200 rounded-xl p-6 min-h-[400px] bg-white focus-within:ring-2 focus-within:ring-brand-accent focus-within:border-transparent transition-all' id='editorjs'></div>
          </div>
        </div>

        {/* Sidebar - 1 column */}
        <div className='space-y-6'>
          {/* Categories Card */}
          <div className='card p-6'>
            <label className='flex items-center gap-2 text-sm font-semibold text-brand-primary mb-4'>
              <HiTag className="text-brand-accent" />
              Categories
            </label>

            {/* Main Category */}
            <div className='mb-4'>
              <label className='block text-xs font-medium text-brand-muted mb-2'>Main Category</label>
              <div className='relative'>
                <button
                  onClick={() => setcetagory_list(!cetagory_list)}
                  className='w-full input text-left flex items-center justify-between group'
                >
                  <span className={cetagory_selected_useslator ? 'text-brand-primary font-semibold' : 'text-brand-muted'}>
                    {cetagory_selected_useslator || "Select category"}
                  </span>
                  <MdArrowDropDown className={`text-2xl text-brand-muted transition-transform ${cetagory_list ? 'rotate-180' : ''}`} />
                </button>
                
                {cetagory_list && (
                  <div className='absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto cusSc z-50'>
                    {cetagory_data?.getCetagory.map((data, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          dispatch(cetagory_selected(data.cetagory))
                          setcetagory_list(false)
                        }}
                        className='w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0 text-sm font-medium text-brand-primary'
                      >
                        {data.cetagory}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {cetagory_selected_useslator && (
                <Badge variant="primary" className="mt-2">{cetagory_selected_useslator}</Badge>
              )}
            </div>

            {/* Subcategory */}
            <div>
              <label className='block text-xs font-medium text-brand-muted mb-2'>Subcategory</label>
              <div className='relative'>
                <button
                  onClick={() => setsubcetagory_list(!subcetagory_list)}
                  className='w-full input text-left flex items-center justify-between group'
                  disabled={!cetagory_selected_useslator}
                >
                  <span className={subselected_cetagory ? 'text-brand-primary font-semibold' : 'text-brand-muted'}>
                    {subselected_cetagory || "Select subcategory"}
                  </span>
                  <MdArrowDropDown className={`text-2xl text-brand-muted transition-transform ${subcetagory_list ? 'rotate-180' : ''}`} />
                </button>

                {subcetagory_list && filter_subcetagories && (
                  <div className='absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-60 overflow-y-auto cusSc z-50'>
                    {filter_subcetagories.map((data, i) => (
                      <div key={i}>
                        {data.subCetagory.map((sub, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setsubsetselected_cetagory(sub)
                              setsubcetagory_list(false)
                            }}
                            className='w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0 text-sm font-medium text-brand-primary'
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {subselected_cetagory && (
                <Badge variant="default" className="mt-2">{subselected_cetagory}</Badge>
              )}
            </div>
          </div>

          {/* SEO Card */}
          <div className='card p-6'>
            <label className='flex items-center gap-2 text-sm font-semibold text-brand-primary mb-4'>
              <HiGlobeAlt className="text-brand-accent" />
              SEO Settings
            </label>
            
            <div className='space-y-4'>
              <div>
                <label className='block text-xs font-medium text-brand-muted mb-2'>Meta Title</label>
                <input
                  type="text"
                  className='input text-sm'
                  placeholder='SEO-friendly title'
                  value={seo_content.metaTitle}
                  onChange={(e) => setseo_content((perv) => ({ ...perv, metaTitle: e.target.value }))}
                />
                <p className='text-xs text-brand-muted mt-1'>{seo_content.metaTitle.length}/60 characters</p>
              </div>

              <div>
                <label className='block text-xs font-medium text-brand-muted mb-2'>Meta Description</label>
                <textarea
                  className='input text-sm resize-none'
                  rows="3"
                  placeholder='Brief description for search engines'
                  value={seo_content.metaDescription}
                  onChange={(e) => setseo_content((perv) => ({ ...perv, metaDescription: e.target.value }))}
                />
                <p className='text-xs text-brand-muted mt-1'>{seo_content.metaDescription.length}/160 characters</p>
              </div>

              <div>
                <label className='block text-xs font-medium text-brand-muted mb-2'>URL Slug</label>
                <div className='flex items-center gap-2'>
                  <span className='text-xs text-brand-muted'>/blog/</span>
                  <input
                    type="text"
                    className='input text-sm flex-1'
                    placeholder='url-friendly-slug'
                    value={seo_content.slug}
                    onChange={(e) => setseo_content((perv) => ({ ...perv, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') }))}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Publish Card */}
          <div className='card p-6 bg-gradient-to-br from-brand-accent/5 to-teal-50'>
            <h3 className='text-sm font-semibold text-brand-primary mb-3'>Publishing Checklist</h3>
            <div className='space-y-2 text-xs'>
              <div className={`flex items-center gap-2 ${blog_data_state.title ? 'text-green-600' : 'text-brand-muted'}`}>
                <HiCheckCircle className={blog_data_state.title ? '' : 'opacity-30'} />
                Title added
              </div>
              <div className={`flex items-center gap-2 ${blog_data_state.blog_thumbnail ? 'text-green-600' : 'text-brand-muted'}`}>
                <HiCheckCircle className={blog_data_state.blog_thumbnail ? '' : 'opacity-30'} />
                Featured image uploaded
              </div>
              <div className={`flex items-center gap-2 ${blog_data_state.cetagory ? 'text-green-600' : 'text-brand-muted'}`}>
                <HiCheckCircle className={blog_data_state.cetagory ? '' : 'opacity-30'} />
                Category selected
              </div>
              <div className={`flex items-center gap-2 ${editor_date.blocks?.length > 0 ? 'text-green-600' : 'text-brand-muted'}`}>
                <HiCheckCircle className={editor_date.blocks?.length > 0 ? '' : 'opacity-30'} />
                Content added
              </div>
              <div className={`flex items-center gap-2 ${seo_content.metaTitle ? 'text-green-600' : 'text-brand-muted'}`}>
                <HiCheckCircle className={seo_content.metaTitle ? '' : 'opacity-30'} />
                SEO optimized
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Create_blog