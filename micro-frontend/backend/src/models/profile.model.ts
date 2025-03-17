import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IProfile extends Document {
    name: string;
    email: string;
    password: string;
}

const ProfileSchema = new Schema<IProfile>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    },
    { timestamps: true }
);

ProfileSchema.pre<IProfile>("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

export const Profile = mongoose.model<IProfile>("Profile", ProfileSchema);
