export interface IColumn {
  id: number;
  order: number;
  name: string;
}

export interface ITask {
  id: number;
  name: string;
  column_id: number;
  order: number;
  assigned_users?: Array<number>;
  createdAt: Date;
  description?: string;
}

export interface FetchColumnRequestProps {}

export interface CreateTaskRequestProps {
  name: string;
  column_id: number;
  description?: string | "";
}

export interface DeleteTaskRequestProps {
  id: number;
}
