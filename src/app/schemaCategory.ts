import { File } from './file'

export interface SchemaCategory {
  id: number | null;
  name: string | null;
  iconFile: File | null
}
