import axios from "axios";

interface CrudOptions {
  resource: string;
  errorGetAll?: (error) => void;
  errorGetOne?: (error) => void;
  errorCrete?: (error) => void;
  errorUpdate?: (error) => void;
  errorDelete?: (error) => void;
}
export const createCrud = (options: CrudOptions) => {
  const api = axios.create({
    baseURL: `http://localhost:4000/${options.resource}`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const getAll = async (data?: any) => {
    try {
      const response = await api.get("/", { params: data });
      console.log(response);
      return response.data;
    } catch (error) {
      options.errorGetAll?.(error);
      return error;
    }
  };

  const getOne = async (id: number) => {
    try {
      const response = await api.get(`/${id}`);
      return response.data;
    } catch (error) {
      options.errorGetOne?.(error);
      return error;
    }
  };

  const create = async (data: any) => {
    try {
      const response = await api.post("/", data);
      return response.data;
    } catch (error) {
      options.errorCrete?.(error);
      return error;
    }
  };

  const update = async (id: number, data: any) => {
    try {
      const response = await api.put(`/${id}`, data);
      return response.data;
    } catch (error) {
      options.errorUpdate?.(error);
      return error;
    }
  };

  const deleteOne = async (id: number) => {
    try {
      const response = await api.delete(`/${id}`);
      return response.data;
    } catch (error) {
      options.errorDelete?.(error);
      return error;
    }
  };

  return { getAll, getOne, create, update, deleteOne };
};
