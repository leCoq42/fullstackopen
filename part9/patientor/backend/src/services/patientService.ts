import patientsData from "../../data/patients";

import { PatientEntry } from "../types";

const getPatients = (): PatientEntry[] => {
  return patientsData;
};

const addPatient = () => {
  return null;
};

export default {
  getPatients,
  addPatient,
};
