import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "../features/api/apiSlice";
import { categoriesApiSlice } from "../features/categories/categorySlice";
import { castMembersApiSlice } from "../features/cast/castMembersSlice";

const rootReducer = combineReducers({
  api: apiSlice.reducer,
  categories: categoriesApiSlice.reducer,
  castMembers: castMembersApiSlice.reducer,
});

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({})
        .concat(apiSlice.middleware),

  });
  setupListeners(store.dispatch);
  return store;
};

export const store = makeStore();
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
