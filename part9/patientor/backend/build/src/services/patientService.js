"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
<<<<<<< HEAD
const uuid_1 = require("uuid");
=======
>>>>>>> 2a74253c1403fa852ee02e7027b31bbdcaf3db8d
const getPatients = () => {
    return patients_1.default;
};
const getNonSensitivePatientEntry = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
<<<<<<< HEAD
const findById = (id) => {
    const entry = patients_1.default.find((p) => p.id === id);
    return entry;
};
const addPatient = (entry) => {
    const id = (0, uuid_1.v1)();
    const newPatient = Object.assign({ id }, entry);
    patients_1.default.push(newPatient);
    return newPatient;
};
exports.default = {
    getPatients,
    getNonSensitivePatientEntry,
    findById,
    addPatient,
=======
// const addPatient = () => {
//   return null;
// };
exports.default = {
    getPatients,
    getNonSensitivePatientEntry,
    // addPatient,
>>>>>>> 2a74253c1403fa852ee02e7027b31bbdcaf3db8d
};
