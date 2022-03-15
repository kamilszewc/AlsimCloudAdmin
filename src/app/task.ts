export interface Task {
  id: number | null;
  name: string | null;
  description: string | null;
  status: string | null;
  progress: string | null;
  numberOfCpus: number | null;
  numberOfGpus: number | null;
  ramMemory: number | null;
  zone: number | null;
  errorCode: number | null;
  message: string | null;
}
