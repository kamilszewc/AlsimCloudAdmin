import {SchemaCategory} from "./schemaCategory";
import {File} from "./file";

export interface Schema {
  id: number | null;
  name: string | null;
  description: string | null;
  paymentMethod: string | null;
  schemaCategory: SchemaCategory | null;
  validationKeys: string | null;
  solverGroup: string | null;
  ownerGitlabId: number | null;
  minNumberOfCpus: number | null;
  minNumberOfGpus: number | null;
  minRamMemory: number | null;
  latestSolverVersion: string | null;
  assessmentKeys: string | null;
  usesMlModel: boolean | null;
  icon: File | null;
  banner: File | null;
}
