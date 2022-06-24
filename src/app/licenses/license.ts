import {LicenseType} from "../license-types/license-types.service";
import {User} from "../user";

export interface License {
  id: string | null;
  licenseType: LicenseType | null;
  isEducational: boolean | null;
  expirationTime: string | null;
  startTime: string | null;
  user: User | null;
  tokens: number | null;
  isTrialPeriod: boolean | null;
  isValid: boolean | null;
}
