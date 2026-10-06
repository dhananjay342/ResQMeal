import bcrypt from "bcrypt";
import User from "../models/user.js";

import { ConflictError } from "../errors/conflict.js";
import { NotFoundError } from "../errors/not-found.js";

export const create = async (data) => {
  const existingUser = await User.findOne({ email: data.email });

  if (existingUser) {
    throw new ConflictError("User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    ...data,
    password: hashedPassword,
  });

  const { password, ...userWithoutPassword } = user.toObject();

  return userWithoutPassword;
};

export const index = async () => {
  const users = await User.find({}, { password: 0 });

  return users;
};

export const show = async (id) => {
  const user = await User.findById(id, { password: 0 });

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return user;
};

export const update = async (id, data) => {
  const user = await User.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    projection: { password: 0 },
    runValidators: true,
  });

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return user;
};

export const remove = async (id) => {
  const user = await User.findByIdAndDelete(id, {
    projection: { password: 0 },
  });

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return user;
};