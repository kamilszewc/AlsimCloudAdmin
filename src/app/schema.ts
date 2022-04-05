import {SchemaCategory} from "./schemaCategory";
import {Myfile} from "./myfile";

export interface Schema {
  id: number | null;
  name: string | null;
  description: string | null;
  paymentMethod: string | null;
  schemaCategory: SchemaCategory | null;
  validationKeys: string | null;
  solverGroup: string | null;
  ownersGitlabId: number | null;
  minNumberOfCpus: number | null;
  minNumberOfGpus: number | null;
  minRamMemory: number | null;
  latestSolverVersion: string | null;
  assessmentKeys: string | null;
  usesMlModel: boolean | null;
  icon: Myfile | null;
  banner: Myfile | null;
  commandTemplate: string | null;
}

export interface UserSchemaInfo {
  permitted: Schema[] | null;
  notPermitted: Schema[] | null;
}
