import { z } from "zod";
import { BaseEntrySchema, NewPatientSchema } from "./utils";

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

// // eslint-disable-next-line @typescript-eslint/no-empty-object-type
// export interface Entry {}
//
// export interface Patient {
//   id: string;
//   name: string;
//   ssn: string;
//   occupation: string;
//   gender: Gender;
//   dateOfBirth: string;
//   entries: Entry[];
// }

export type NewPatient = z.infer<typeof NewPatientSchema>;

export type NewEntry = z.infer<typeof BaseEntrySchema>;

export interface Patient extends NewPatient {
  id: string;
}

export type NonSensitivePatientEntry = Omit<Patient, "ssn" | "entries">;
