import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CreateTaskRequestProps,
  FetchColumnRequestProps,
  IColumn,
  ITask,
  DeleteTaskRequestProps,
} from "./types/table";

const PORT = 5000;

export const tableApi = createApi({
  reducerPath: "tableApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:${PORT}/api/`,
    prepareHeaders: (headers, { getState }) => {
      //@ts-ignore
      const token = getState().profileReducer.token;
      console.log(token);
      if (token) {
        headers.set("Authorization", "Bearer " + token);
      }
    },
  }),
  endpoints: (builder) => ({
    fetchColumns: builder.mutation<IColumn[], FetchColumnRequestProps>({
      query: () => {
        return {
          url: "column",
          method: "GET",
        };
      },
    }),
    createTask: builder.mutation<ITask, CreateTaskRequestProps>({
      query: ({ name, column_id, description }) => {
        return {
          url: "task",
          method: "POST",
          body: {
            name,
            column_id,
            description,
          },
        };
      },
    }),
    fetchTasks: builder.mutation<ITask[], any>({
      query: () => {
        return {
          url: "task",
          method: "GET",
        };
      },
    }),
    deleteTask: builder.mutation<void, DeleteTaskRequestProps>({
      query: ({ id }) => {
        return {
          url: "task",
          method: "DELETE",
          body: {
            id: id,
          },
        };
      },
    }),
  }),
});

export const {
  useFetchColumnsMutation,
  useCreateTaskMutation,
  useFetchTasksMutation,
  useDeleteTaskMutation,
} = tableApi;
