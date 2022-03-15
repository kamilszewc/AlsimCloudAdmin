export interface HistoricalTask {
  id: number | null;
  name: string | null;
  numberOfCpus: number | null;
  numberOfGpus: number | null;
  ramMemory: number | null;
  createDateTime: string | null;
  schemaId: number | null;
  resourceId: number | null;
}
