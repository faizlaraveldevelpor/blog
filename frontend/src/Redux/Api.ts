import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  blogs_api_data,
  cetagory_api_data,
  login_user_sl_fn,
  single_blog_data_fnc,
} from "./api_data_slice";
import type { GetBlogResponse, GetCategoryResponse, GetSingleBlogResponse } from "../types";

const baseUrl = import.meta.env.DEV
  ? "/api/v1/"
  : (import.meta.env.VITE_API_BASE_URL || "https://blogapi.mfaizansari.tech/api/v1/");

export const Api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl, credentials: "include" }),
  tagTypes: ["user", "blog", "like", "comment", "cetagory"],
  keepUnusedDataFor: 24 * 60 * 60 * 1000,
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data: unknown) => ({
        url: "resgister",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    login: builder.mutation({
      query: (data: unknown) => ({
        url: "login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user", "blog", "cetagory"],
    }),
    cetagory_create: builder.mutation({
      query: (data: unknown) => ({
        url: "create/cetagory",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["cetagory"],
    }),
    subcetagory_create: builder.mutation({
      query: (data: unknown) => ({
        url: "update/subcetagory",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["cetagory"],
    }),
    get_cetagory: builder.query<GetCategoryResponse, void>({
      query: () => ({
        url: "cetagory",
        method: "GET",
      }),
      providesTags: ["cetagory"],
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (data) dispatch(cetagory_api_data(data));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    blogs: builder.query<GetBlogResponse, string>({
      query: (data) => ({
        url: `blogs/${data}`,
        method: "GET",
      }),
      providesTags: ["blog", "cetagory", "comment", "like", "user"],
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (data) dispatch(blogs_api_data(data));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    get_for_blog_premium: builder.mutation({
      query: (current_page: string) => ({
        url: `blogs/premium/${current_page}`,
        method: "POST",
      }),
      invalidatesTags: ["blog"],
    }),
    show_data_from_cetagory: builder.mutation({
      query: (cetagory_name: unknown) => ({
        url: "get/blogs/cetagory",
        method: "POST",
        body: cetagory_name,
      }),
      invalidatesTags: ["blog"],
    }),
    main_blog_in_blogs_page: builder.mutation({
      query: (cetagory_name: unknown) => ({
        url: "blog/main/page",
        method: "POST",
        body: cetagory_name,
      }),
      invalidatesTags: ["blog"],
    }),
    create_blog: builder.mutation({
      query: (form: FormData) => ({
        url: "create",
        method: "POST",
        body: form,
      }),
      invalidatesTags: ["blog", "cetagory", "comment", "like", "user"],
    }),
    single_blog: builder.query<GetSingleBlogResponse, string>({
      query: (id) => ({
        url: `/single/blog/${id}`,
        method: "GET",
      }),
      providesTags: ["blog", "cetagory", "comment", "like", "user"],
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (data) dispatch(single_blog_data_fnc(data));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    update_blog: builder.mutation({
      query: ({ id, form }: { id: string; form: FormData }) => ({
        url: `/update/${id}`,
        method: "PUT",
        body: form,
      }),
      invalidatesTags: ["blog", "cetagory", "comment", "like", "user"],
    }),
    like_blog: builder.mutation({
      query: (id: string) => ({
        url: `like/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["blog", "cetagory", "comment", "like", "user"],
    }),
    comment: builder.mutation({
      query: ({ id, comment_data }: { id: string; comment_data: { text: string } }) => ({
        url: `/create/comments/${id}`,
        method: "POST",
        body: comment_data,
      }),
      invalidatesTags: ["blog", "cetagory", "comment", "like", "user"],
    }),
    draft: builder.mutation({
      query: (id: string) => ({
        url: `/blog/draft/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["blog", "cetagory", "comment", "like", "user"],
    }),
    Search: builder.query<GetSingleBlogResponse, string>({
      query: (data) => ({
        url: `search/${data}`,
        method: "GET",
      }),
      providesTags: ["blog", "cetagory", "comment", "like", "user"],
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (data) dispatch(single_blog_data_fnc(data));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    delete_blog: builder.mutation({
      query: (id: string) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blog", "cetagory", "comment", "like", "user"],
    }),
    delete_comm: builder.mutation({
      query: ({ id, blog_id }: { id: string; blog_id: string }) => ({
        url: `/delete/comment/${id}`,
        method: "DELETE",
        body: { blog_id },
      }),
      invalidatesTags: ["blog", "cetagory", "comment", "like", "user"],
    }),
    create_cetagory: builder.mutation({
      query: (cetagory: { cetagory: string }) => ({
        url: "/create/cetagory",
        method: "POST",
        body: cetagory,
      }),
      invalidatesTags: ["blog", "cetagory", "comment", "like", "user"],
    }),
    create_subcetagory: builder.mutation({
      query: (cetagory: { subCetagory: string; cetagory: string }) => ({
        url: "/create/subcetagory",
        method: "POST",
        body: cetagory,
      }),
      invalidatesTags: ["blog", "cetagory", "comment", "like", "user"],
    }),
    deletecetagory: builder.mutation({
      query: (cetagory: string) => ({
        url: `/delete/cetagory/${cetagory}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blog", "cetagory", "comment", "like", "user"],
    }),
    deletesubcetagory: builder.mutation({
      query: (cetagory: { cetagory: string; subCetagory: string }) => ({
        url: `/delete/subcetagory/${JSON.stringify(cetagory)}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blog", "cetagory", "comment", "like", "user"],
    }),
    AboutCreate_Api: builder.mutation({
      query: (data: FormData) => ({
        url: "/About",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["blog", "cetagory", "comment", "like", "user"],
    }),
    privacy_Api: builder.mutation({
      query: (data: FormData) => ({
        url: "/privacy",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["blog", "cetagory", "comment", "like", "user"],
    }),
    Disclamer_Api: builder.mutation({
      query: (data: FormData) => ({
        url: "/Disclamer",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["blog", "cetagory", "comment", "like", "user"],
    }),
    term_Api: builder.mutation({
      query: (data: FormData) => ({
        url: "/terms",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["blog", "cetagory", "comment", "like", "user"],
    }),
    getAbout_Api: builder.query({
      query: (data?: unknown) => ({
        url: "/get/About",
        method: "GET",
        body: data,
      }),
      providesTags: ["blog", "cetagory", "comment", "like", "user"],
    }),
    getterm_Api: builder.query({
      query: (data?: unknown) => ({
        url: "/get/term",
        method: "GET",
        body: data,
      }),
      providesTags: ["blog", "cetagory", "comment", "like", "user"],
    }),
    getA_Disclamer: builder.query({
      query: (data?: unknown) => ({
        url: "/get/Disclamer",
        method: "GET",
        body: data,
      }),
      providesTags: ["blog", "cetagory", "comment", "like", "user"],
    }),
    getPrivacy_Api: builder.query({
      query: (data?: unknown) => ({
        url: "/get/privacy",
        method: "GET",
        body: data,
      }),
      providesTags: ["blog", "cetagory", "comment", "like", "user"],
    }),
    logout_Api: builder.mutation({
      query: (data?: unknown) => ({
        url: "/logout",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["blog", "cetagory", "comment", "like", "user"],
    }),
    draft_get: builder.query({
      query: (data: string) => ({
        url: `/get_draft/${data}`,
        method: "GET",
      }),
      providesTags: ["blog", "cetagory", "comment", "like", "user"],
    }),
    update_profile: builder.mutation({
      query: (data: FormData) => ({
        url: "/update/profile",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["blog", "cetagory", "comment", "like", "user"],
    }),
    sendMail: builder.mutation({
      query: (data: string) => ({
        url: `/forget/password/${data}`,
        method: "POST",
      }),
      invalidatesTags: ["blog", "cetagory", "comment", "like", "user"],
    }),
    Check_otp: builder.mutation({
      query: (data: string) => ({
        url: `/check/otp/${data}`,
        method: "POST",
      }),
      invalidatesTags: ["blog", "cetagory", "comment", "like", "user"],
    }),
    Create_newPss: builder.mutation({
      query: (data: unknown) => ({
        url: "/create/new/password",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["blog", "cetagory", "comment", "like", "user"],
    }),
    Change_role: builder.mutation({
      query: ({ id, role }: { id: string; role: string }) => ({
        url: `/user/role/${id}?role=${role}`,
        method: "PUT",
      }),
      invalidatesTags: ["user", "blog", "cetagory", "comment"],
    }),
    All_users: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["blog", "cetagory", "comment", "like", "user"],
    }),
    delete_users: builder.mutation({
      query: (id: string) => ({
        url: `/users/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blog", "cetagory", "comment", "like", "user"],
    }),
    login_user: builder.query({
      query: () => ({
        url: "/login/user",
        method: "GET",
      }),
      providesTags: ["blog", "cetagory", "comment", "like", "user"],
      onQueryStarted: async (_arg, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          if (data && (data as { user?: unknown }).user) {
            dispatch(login_user_sl_fn((data as { user: unknown }).user as Parameters<typeof login_user_sl_fn>[0]));
          }
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useCetagory_createMutation,
  useGet_cetagoryQuery,
  useSubcetagory_createMutation,
  useBlogsQuery,
  useGet_for_blog_premiumMutation,
  useShow_data_from_cetagoryMutation,
  useMain_blog_in_blogs_pageMutation,
  useCreate_blogMutation,
  useSingle_blogQuery,
  useUpdate_blogMutation,
  useLike_blogMutation,
  useCommentMutation,
  useDraftMutation,
  useSearchQuery,
  useDelete_blogMutation,
  useDelete_commMutation,
  useCreate_cetagoryMutation,
  useCreate_subcetagoryMutation,
  useDeletecetagoryMutation,
  useDeletesubcetagoryMutation,
  useAboutCreate_ApiMutation,
  useGetAbout_ApiQuery,
  usePrivacy_ApiMutation,
  useGetPrivacy_ApiQuery,
  useDisclamer_ApiMutation,
  useGetA_DisclamerQuery,
  useTerm_ApiMutation,
  useGetterm_ApiQuery,
  useLogout_ApiMutation,
  useDraft_getQuery,
  useUpdate_profileMutation,
  useSendMailMutation,
  useCheck_otpMutation,
  useCreate_newPssMutation,
  useChange_roleMutation,
  useAll_usersQuery,
  useDelete_usersMutation,
  useLogin_userQuery,
} = Api;
