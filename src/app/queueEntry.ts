
export interface QueueEntry {
  id: number | null;
  taskId: number | null;
  solverGroup: string | null;
  command: string | null;
  numberOfCpus: number | null;
  numberOfGpus: number | null;
  ramMemory: number | null;
  version: string | null;
  priority: number | null;
  launchTrials: number | null;
  zone: number | null;
  runId: string | null;
  storageManagerToken: string | null;
  inputFiles: string[] | null;
}
