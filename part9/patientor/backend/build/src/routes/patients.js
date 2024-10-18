"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
<<<<<<< HEAD
const utils_1 = require("../utils");
const zod_1 = require("zod");
=======
>>>>>>> 2a74253c1403fa852ee02e7027b31bbdcaf3db8d
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    res.send(patientService_1.default.getNonSensitivePatientEntry());
});
<<<<<<< HEAD
router.get("/:id", (req, res) => {
    const patient = patientService_1.default.findById(req.params.id);
    if (patient) {
        res.send(patient);
    }
    else {
        res.sendStatus(404);
    }
});
const newPatientParser = (req, _res, next) => {
    try {
        utils_1.NewPatientSchema.parse(req.body);
        next();
    }
    catch (error) {
        next(error);
    }
};
const errorMiddleware = (error, _req, res, next) => {
    if (error instanceof zod_1.z.ZodError) {
        res.status(400).json({ error: error.issues });
    }
    else {
        next(error);
    }
};
router.post("/", newPatientParser, (req, res) => {
    const addedEntry = patientService_1.default.addPatient(req.body);
    res.json(addedEntry);
});
router.use(errorMiddleware);
=======
// router.post("/", (_req, res) => {
//   res.send("Saving a record!");
// });
>>>>>>> 2a74253c1403fa852ee02e7027b31bbdcaf3db8d
exports.default = router;
