import patientsData from "../../data/patients";

import {
  Patient,
  NonSensitivePatientEntry,
  NewPatient as NewPatient,
} from "../types";

const getPatients = (): Patient[] => {
  return patientsData;
};

const getNonSensitivePatientEntry = (): NonSensitivePatientEntry[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findById = (id: string): Patient | undefined => {
  const entry = patientsData.find((p) => p.id === id);
  return entry;
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: Math.max(...patientsData.map((d) => d.id)) + 1,
    ...entry,
  };
  patientsData.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getNonSensitivePatientEntry,
  findById,
  addPatient,
};
