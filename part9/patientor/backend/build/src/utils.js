"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewPatient = exports.NewPatientSchema = void 0;
const types_1 = require("./types");
const zod_1 = require("zod");
exports.NewPatientSchema = zod_1.z.object({
    name: zod_1.z.string(),
    dateOfBirth: zod_1.z.string().date(),
    ssn: zod_1.z.string(),
    gender: zod_1.z.nativeEnum(types_1.Gender),
    occupation: zod_1.z.string(),
    entries: zod_1.z.array(zod_1.z.object({})),
});
const toNewPatient = (object) => {
    return exports.NewPatientSchema.parse(object);
};
exports.toNewPatient = toNewPatient;
