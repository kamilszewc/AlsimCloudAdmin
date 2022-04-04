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
  isSuspended: boolean | null;
  numberOfCpusInUse: number | null;
  numberOfGpusInUse: number | null;
  ramMemoryInUse: number | null;
  status: string | null;
  jwtSecret: string | null;
  version: string | null;
}

export interface CloudResource {
  name: string | null;
  description: string | null;
  instanceTypeName: string | null;
}

export interface CloudInstanceInfo {
  id: number | null;
  name: string | null;
  description: string | null;
  numberOfCpus: number | null;
  numberOfGpus: number | null;
  ramMemory: number | null;
  gpuMemory: number | null;
  gpuName: string | null;
}
