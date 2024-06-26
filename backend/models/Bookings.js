import mongoose, { Mongoose } from "mongoose";

const bookingSchema = new mongoose.Schema({
    movie:{
        type: mongoose.Types.ObjectId,
        ref: "Movie",
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    seat:{
        type: Number,
        required: true,

    },
    user:{
        type:mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
});

export default mongoose.model("Booking", bookingSchema);