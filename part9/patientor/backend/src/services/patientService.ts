import patientsData from "../../data/patients";
import { v1 as uuid } from "uuid";
import { Patient, NonSensitivePatientEntry, NewPatient } from "../types";

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
  const id = uuid();
  const newPatient = {
    id,
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
