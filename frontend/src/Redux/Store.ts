import { configureStore } from "@reduxjs/toolkit";
import All_moduls from "./ALL_moduls._Slice";
import Api_data_slice from "./api_data_slice";
import { Api } from "./Api";

const store = configureStore({
  reducer: {
    All_moduls: All_moduls,
    Api_data_slice: Api_data_slice,
    [Api.reducerPath]: Api.reducer,
  },
  middleware: (defaultMiddleware) => defaultMiddleware().concat(Api.middleware),
});

export default store;
