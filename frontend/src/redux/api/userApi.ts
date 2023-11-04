import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
   reducerPath: "usersApi",
   baseQuery: fetchBaseQuery({
      baseUrl: "http://localhost:4444",
      credentials: "include",
   }),
   endpoints: (builder) => ({
      getQuizes: builder.query({
         query: () => ({
            url: `/quizes`,
            method: "GET",
         }),
      }),
      getQuizById: builder.query({
         query: (body) => ({
            url: `/quiz`,
            method: "GET",
            body: body,
         }),
      }),
      createQuiz: builder.mutation({
         query: (body) => ({
            url: `/quiz`,
            method: "POST",
            body: body,
         }),
      }),
      registerUser: builder.mutation({
         query: (body) => ({
            url: `/register`,
            method: "POST",
            body: body,
         }),
      }),
      authUser: builder.mutation({
         query: (body) => ({
            url: `/auth`,
            method: "POST",
            body: body,
         }),
      }),
      checkAuth: builder.mutation({
         query: (body) => ({
            url: `/refresh`,
            method: "GET",
            credentials: "include",
            body: body,
         }),
      }),

      logout: builder.mutation({
         query: () => ({
            url: `/logout`,
            method: "POST",
            credentials: "include",
         }),
      }),
   }),
});

// const baseQuery = fetchBaseQuery({
//    baseUrl: "http://localhost:4444",
//    credentials: "include",
//    prepareHeaders: (headers, { getState }: any) => {
//       const token = getState().auth.token;

//       if (token) {
//          headers.set("authorization", `Bearer ${token}`);
//       }
//       return headers;
//    },
// });

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//    let result = await baseQuery(args, api, extraOptions);
//    if(result?.error?.status === 403) {
//       console.log('refresh token send')

//       const refreshResult = await baseQuery('/refresh', api, extraOptions)
//       console.log(refreshResult)

//       if(refreshResult?.data) {
//          const user = api.getState().auth.user
//       }
//    }
// };

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
   useRegisterUserMutation,
   useAuthUserMutation,
   useCheckAuthMutation,
   useLogoutMutation,
   useCreateQuizMutation,
   useGetQuizesQuery,
   useGetQuizByIdQuery
} = userApi;
