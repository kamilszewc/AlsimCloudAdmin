import {LicenseType} from "../license-types/license-types.service";

export interface LicenseOption {
  id: number | null;
  name: string | null;
  licenseType: LicenseType | null;
  licenseTypeId: number | null;
  numberOfDays: number | null;
  isEducational: boolean | null;
  tokens: number | null;
  clientType: string | null;
}
