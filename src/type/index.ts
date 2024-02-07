

export type TTask = {
  id: string;
  name: string;
  priority: string;
  status: string,
  completed: boolean
}

export type TTaskFormData = {
  name: string;
  priority: string;
  status: string
}