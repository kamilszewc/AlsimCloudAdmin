import {Schema} from "./schema";
import {Resource} from "./resource";
import {User} from "./user";

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
  schema: Schema | null;
  resource: Resource | null;
  user: User | null;
  consumedTokens: number | null;
  tokenSource: string | null;
  paid: boolean | null;
  createDateTime: string | null;
  updateDateTime: string | null;
  taskEndTime: string | null;
}
