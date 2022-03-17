export interface Resource {
  id: number | null;
  name: string | null;
  description: string | null;
  numberOfCpus: number | null;
  numberOfGpus: number | null;
  ramMemory: number | null;
  url: string | null;
  zone: number | null;
  type: string | null;
  suspended: boolean | null;
  numberOfCpusInUse: number | null;
  numberOfGpusInUse: number | null;
  ramMemoryInUse: number | null;
  status: string | null;
}
