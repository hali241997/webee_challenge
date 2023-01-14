import { FieldType } from "@appstate/common/types";

export interface DataFieldProps {
  parentIndex: number;
  fieldIndex: number;
  name: string;
  type: FieldType;
}
