import mongoose, { mongo } from "mongoose";

const medicalRecordSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
        required: true
    },
    doctorAssigned: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true    
    },
    
}, {timestamps: true});

export const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordSchema);
