import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Activity } from "../../app/models/activity";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7217/api",
  }),
  tagTypes: ["Activities"],
  endpoints: (builder) => ({
    getActivities: builder.query({
      query: () => "/Activities",
      providesTags: ["Activities"],
    }),
    getActivitiesById: builder.query({
      query: (id: string) => `/Activities/${id}`,
    }),
    createActivity: builder.mutation({
      query: (activity: Activity) => ({
        url: "/Activities",
        method: "POST",
        body: activity,
      }),
      invalidatesTags: ["Activities"],
    }),
    updateActivity: builder.mutation({
      query: (updatedActivity) => ({
        url: "/Activities",
        method: "PUT",
        body: updatedActivity,
      }),
      invalidatesTags: ["Activities"],
    }),
    deleteActivity: builder.mutation({
      query: (id: string) => ({
        url: `/Activities/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Activities"],
    }),
  }),
});

export const {
  useGetActivitiesQuery,
  useGetActivitiesByIdQuery,
  useCreateActivityMutation,
  useUpdateActivityMutation,
  useDeleteActivityMutation,
} = apiSlice;
