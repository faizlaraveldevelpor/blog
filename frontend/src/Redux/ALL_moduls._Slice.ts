import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types";

interface AllModulsState {
  Auth_moduls_state: boolean;
  register_moduls_state: boolean;
  cetagory_module_state: boolean;
  login_user: User | User[] | [];
  like_state: unknown;
  comment_initial_state: boolean;
  user_profile_state: boolean;
}

const getInitialLoginUser = (): User | User[] | [] => {
  try {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const All_moduls = createSlice({
  name: "moduls",
  initialState: {
    Auth_moduls_state: false,
    register_moduls_state: false,
    cetagory_module_state: false,
    login_user: getInitialLoginUser(),
    like_state: null as unknown,
    comment_initial_state: false,
    user_profile_state: false,
  } as AllModulsState,
  reducers: {
    Auth_moduls_fnc: (state, action: PayloadAction<boolean>) => {
      state.Auth_moduls_state = action.payload;
    },
    register_toggle: (state, action: PayloadAction<boolean>) => {
      state.register_moduls_state = action.payload;
    },
    cetagory_toggle_fnc: (state, action: PayloadAction<boolean>) => {
      state.cetagory_module_state = action.payload;
    },
    login_user_data: (state, action: PayloadAction<User | User[] | []>) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.login_user = action.payload;
    },
    comment_fnc: (state, action: PayloadAction<boolean>) => {
      state.comment_initial_state = action.payload;
    },
    like: (state, action: PayloadAction<unknown>) => {
      state.like_state = action.payload ? true : action.payload;
    },
    user_profile: (state) => {
      state.user_profile_state = !state.user_profile_state;
    },
  },
});

export default All_moduls.reducer;
export const {
  Auth_moduls_fnc,
  register_toggle,
  cetagory_toggle_fnc,
  login_user_data,
  like,
  comment_fnc,
  user_profile,
} = All_moduls.actions;
