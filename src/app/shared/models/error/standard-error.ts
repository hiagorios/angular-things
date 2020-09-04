import { FieldMessage } from './field-message';
export interface StandardError {
  timestamp: string;
  status: number;
  message: string;
  path: string;
  fieldErrors?: FieldMessage[];
}
