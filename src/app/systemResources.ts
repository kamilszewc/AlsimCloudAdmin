export interface SystemResources {
  diskSpace: DiskSpace | null;
  networkBandwidth: NetworkBandwidth | null;
  cudaResources: CudaResource[] | null;
  processesStatistics: ProcessesStatistics | null;
  ramMemory: RamMemory | null;
}

export interface DiskSpace {
  root: DiskInfo | null;
  storage: DiskInfo | null;
}

export interface DiskInfo {
  available: number | null;
  used: number | null;
}

export interface NetworkBandwidth {
  receiveSpeed: number | null;
  transmitSpeed: number | null;
}

export interface CudaResource {
  id: number | null;
  name: string | null;
  totalMemory: number | null;
  freeMemory: number | null;
  usedMemory: number | null;
  temperature: number | null;
  utilisation: number | null;
}

export interface ProcessesStatistics {
  numberOfProcesses: number | null;
  numberOfThreads: number | null;
}

export interface RamMemory {
  available: number | null;
  free: number | null;
  used: number | null;
  cached: number | null;
  buffers: number | null;
}
