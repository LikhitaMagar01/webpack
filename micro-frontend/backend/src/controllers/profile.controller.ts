import { FastifyRequest, FastifyReply } from "fastify";
import { Profile } from "../models/profile.model";
import { CreateProfileRequest, UpdateProfileRequest, ProfileParams } from "../types/profile.types";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export const getProfiles = async (req: FastifyRequest, reply: FastifyReply) => {
  const profiles = await Profile.find();
  return reply.send(profiles);
};

export const getProfileById = async (req: FastifyRequest<{ Params: ProfileParams }>, reply: FastifyReply) => {
  const { id } = req.params;
  const profile = await Profile.findById(id);
  if (!profile) {
    return reply.code(404).send({ message: "Profile not found" });
  }
  return reply.send(profile);
};

export const createProfile = async (req: FastifyRequest<{ Body: CreateProfileRequest }>, reply: FastifyReply) => {
  const { name, email, password } = req.body;
  const existingProfile = await Profile.findOne({ email })
  if(existingProfile) {
    return reply.code(400).send({ message: "Email already exists."});
  }
  const profile = new Profile({ name, email, password });
  await profile.save();
  return reply.code(201).send(profile);
};

export const updateProfile = async (req: FastifyRequest<{ Params: ProfileParams; Body: UpdateProfileRequest }>, reply: FastifyReply) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const profile = await Profile.findByIdAndUpdate(id, { name, email }, { new: true });
  return reply.send(profile);
};

export const deleteProfile = async (req: FastifyRequest<{ Params: ProfileParams }>, reply: FastifyReply) => {
  const { id } = req.params;
  const profile = await Profile.findById(id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return reply.code(400).send({ message: "Invalid Profile ID" });
  }
  if(!profile) {
    return reply.code(404).send({ message: "Profile ID is not found" })
  }
  await Profile.findByIdAndDelete(id);
  return reply.send({ message: "Profile deleted" });
};

export const loginProfile = async (req: FastifyRequest<{ Body: { email: string; password: string } }>, reply: FastifyReply) => {
  const { email, password } = req.body;

  const profile = await Profile.findOne({ email });
  if (!profile) {
    return reply.code(400).send({ message: "No accout found with this email" });
  }
  const isMatch = await bcrypt.compare(password, profile.password)
  if(!isMatch) {
    return reply.code(400).send({ message: "Password incorrect" })
  }
  return reply.send({ message: "Login successful", profile });
};