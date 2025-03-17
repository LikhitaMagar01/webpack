import { FastifyInstance } from "fastify";
import { getProfiles, createProfile, updateProfile, deleteProfile, loginProfile, getProfileById } from "../controllers/profile.controller";

export default async function profileRoutes(fastify: FastifyInstance) {
  fastify.get("/", getProfiles);
  fastify.get("/profile/:id", getProfileById);
  fastify.post("/profile/create", createProfile);
  fastify.put("profile/update/:id", updateProfile);
  fastify.delete("profile/delete/:id", deleteProfile);
  fastify.post("/profiles/login", loginProfile);
}