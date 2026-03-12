import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { GetBlogResponse, GetCategoryResponse, GetSingleBlogResponse, User } from "../types";

interface ApiDataState {
  blogs_data: GetBlogResponse | null;
  cetagory: GetCategoryResponse | null;
  cetagory_selected: string;
  update_blog: unknown;
  single_blog_data: GetSingleBlogResponse | null;
  search: unknown;
  update_problem: unknown;
  login_user: User | User[] | [];
}

const initialState: ApiDataState = {
  blogs_data: null,
  cetagory: null,
  cetagory_selected: "",
  update_blog: null,
  single_blog_data: null,
  search: null,
  update_problem: null,
  login_user: [],
};

const Api_data_slice = createSlice({
  name: "api data slice",
  initialState,
  reducers: {
    blogs_api_data: (state, action: PayloadAction<GetBlogResponse>) => {
      state.blogs_data = action.payload;
    },
    cetagory_api_data: (state, action: PayloadAction<GetCategoryResponse>) => {
      state.cetagory = action.payload;
    },
    cetagory_selected: (state, action: PayloadAction<string>) => {
      state.cetagory_selected = action.payload;
    },
    update_blog: (state, action: PayloadAction<unknown>) => {
      state.update_blog = action.payload;
    },
    single_blog_data_fnc: (state, action: PayloadAction<GetSingleBlogResponse>) => {
      state.single_blog_data = action.payload;
    },
    Search_fnc: (state, action: PayloadAction<unknown>) => {
      state.search = action.payload;
    },
    update_problem: (state, action: PayloadAction<unknown>) => {
      state.update_problem = action.payload;
    },
    login_user_sl_fn: (state, action: PayloadAction<User | User[] | []>) => {
      state.login_user = action.payload;
    },
  },
});

export default Api_data_slice.reducer;
export const {
  blogs_api_data,
  cetagory_api_data,
  cetagory_selected,
  update_blog,
  single_blog_data_fnc,
  Search_fnc,
  update_problem,
  login_user_sl_fn,
} = Api_data_slice.actions;
