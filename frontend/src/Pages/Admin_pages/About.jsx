import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header'
import Embed from '@editorjs/embed';
import NestedList from '@editorjs/nested-list'
import { useEffect, useRef, useState } from 'react';
import Marker from '@editorjs/marker'
import ImageTool from '@editorjs/image';
import DragDrop from "editorjs-drag-drop";
import Underline from '@editorjs/underline'
import { useAboutCreate_ApiMutation } from '../../Redux/Api';
import { toast } from 'react-toastify'
import { HiInformationCircle, HiCheckCircle } from "react-icons/hi2";
import Button from '../../Components/shared/Button';

function CreateAbout() {
  let [AboutApifnc, { data, isLoading }] = useAboutCreate_ApiMutation()
  let editor_js_ref = useRef(null)
  let toast_ref = useRef()
  let [editor_date, seteditor_date] = useState()

  let form = new FormData()
  form.append("content", JSON.stringify(editor_date))

  if (editor_date?.blocks) {
    editor_date.blocks.forEach((data) => {
      if (data.type == "Image") {
        form.append("images", data?.data?.file?.image)
        form.append("public_id", data?.data?.file?.public_id)
      }
    })
  }

  let Submit_About_data = () => {
    AboutApifnc(form)
  }

  let editorJs_function = async () => {
    const editor = editor_js_ref.current = new EditorJS({
      holder: "editorjs",
      placeholder: "Tell your story...",
      data: editor_date,
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
                    image,
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

  useEffect(() => {
    if (isLoading) {
      toast_ref.current = toast.loading("Saving...")
    }
    if (!isLoading) {
      toast.dismiss(toast_ref.current)
    }
    if (data) {
      if (data.success == false) {
        toast.error(data.message)
      }
      if (data.success == true) {
        toast.success(data.message)
      }
    }
  }, [data, isLoading])

  return (
    <div className="min-h-screen p-6 md:p-8">
      {/* Header */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8'>
        <div>
          <h1 className='text-3xl font-bold text-brand-primary mb-2 flex items-center gap-3'>
            <HiInformationCircle className="text-brand-accent" />
            About Us
          </h1>
          <p className='text-brand-muted text-sm'>Share your story, mission, and values with your audience</p>
        </div>
        <Button
          onClick={Submit_About_data}
          variant="primary"
          size="lg"
          loading={isLoading}
          className="flex items-center gap-2"
        >
          <HiCheckCircle /> Save Changes
        </Button>
      </div>

      {/* Editor Card */}
      <div className='max-w-5xl mx-auto'>
        <div className='card p-8'>
          <div className='mb-6 pb-4 border-b border-slate-200'>
            <h2 className='text-xl font-semibold text-brand-primary mb-2'>
              About Page Content
            </h2>
            <p className='text-sm text-brand-muted'>
              Create a compelling About page that tells your story and connects with your readers. Share who you are, what you do, and why it matters.
            </p>
          </div>

          <div className='prose max-w-none border border-slate-200 rounded-xl p-6 min-h-[600px] bg-white focus-within:ring-2 focus-within:ring-brand-accent focus-within:border-transparent transition-all' id='editorjs'></div>

          {/* Tips */}
          <div className='mt-6 p-4 bg-teal-50 border border-teal-200 rounded-lg'>
            <h3 className='text-sm font-semibold text-teal-900 mb-2'>✨ About Page Tips</h3>
            <ul className='text-xs text-teal-800 space-y-1'>
              <li>• Start with your mission and what drives you</li>
              <li>• Share your background and expertise</li>
              <li>• Explain what makes your blog unique</li>
              <li>• Include personal photos or team images</li>
              <li>• Add a call-to-action (subscribe, contact, follow)</li>
              <li>• Keep it authentic and conversational</li>
            </ul>
          </div>

          {/* Content Status */}
          <div className='mt-6 flex items-center justify-between p-4 bg-slate-50 rounded-lg'>
            <div className='flex items-center gap-2 text-sm text-brand-muted'>
              <HiInformationCircle />
              <span>
                {editor_date?.blocks?.length > 0 
                  ? `${editor_date.blocks.length} content block${editor_date.blocks.length > 1 ? 's' : ''}`
                  : 'No content yet'}
              </span>
            </div>
            <Button
              onClick={Submit_About_data}
              variant="primary"
              loading={isLoading}
              className="flex items-center gap-2"
            >
              <HiCheckCircle /> Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateAbout
