import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    donctorName: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    qualifications: {
        type: String,
        required: true,
    },
    experience: {
        type: Number,
        default: 0,
        required: true,
    },
    fee: {
        type: Number,
        requred: true
    },
    worksInHospitals: {
        type:[
            {
                types: mongoose.Schema.Types.ObjectId,
                ref: "Hospital",
            }
        ]
    }    

}, {timestamps: true});

export const Doctor = mongoose.model("Doctor", doctorSchema);
