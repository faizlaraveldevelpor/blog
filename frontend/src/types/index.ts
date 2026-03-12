// User & Auth
export interface User {
  _id?: string
  id?: string
  name: string
  email: string
  image?: string
  role?: string
}

// Blog
export interface BlogComment {
  _id: string
  text: string
  user?: User
  blog?: string
  createdAt?: string
}

export interface Blog {
  _id: string
  title: string
  image?: string | string[]
  content?: unknown
  cetagory?: string | { name: string }
  subcetagory?: string
  user?: User
  likes?: string[]
  comments?: BlogComment[]
  createdAt?: string
  Slug?: string
  metaTitle?: string
  metaDescription?: string
}

// API responses
export interface ApiResponse<T = unknown> {
  success: boolean
  message?: string
  data?: T
}

export interface GetBlogResponse {
  get_blog: Blog[]
}

export interface GetSingleBlogResponse {
  blog_get: Blog
}

export interface GetCategoryResponse {
  getCetagory: Category[]
}

export interface Category {
  _id: string
  cetagory: string
  subCetagory: string[]
  blogs?: Blog[]
}

// Redux state
export interface ApiDataState {
  blogs_data: GetBlogResponse | null
  cetagory: GetCategoryResponse | null
  cetagory_selected: string
  update_blog: unknown
  single_blog_data: GetSingleBlogResponse | null
  search: unknown
  update_problem: unknown
  login_user: User | User[] | []
}

export interface AllModulsState {
  Auth_moduls_state: boolean
  register_moduls_state: boolean
  cetagory_module_state: boolean
  login_user: User | User[] | []
  like_state: unknown
  comment_initial_state: boolean
  user_profile_state: boolean
}

export interface RootState {
  All_moduls: AllModulsState
  Api_data_slice: ApiDataState
  api: unknown
}

// EditorJS
export interface EditorJSBlock {
  type: string
  data: Record<string, unknown>
}

export interface EditorJSData {
  blocks?: EditorJSBlock[]
  time?: number
  version?: string
}
