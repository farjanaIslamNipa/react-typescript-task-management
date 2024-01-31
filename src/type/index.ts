export type TTaskPriority = 'high' | 'medium' | 'low'

export type TTask = {
  id: string;
  name: string;
  priority: TTaskPriority;
  status: '',
  completed: boolean
}

export type TTaskFormData = {
  name: string;
  priority: TTaskPriority;
  status: ''
}