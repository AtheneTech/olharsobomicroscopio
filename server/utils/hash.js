import bcrypt from "bcrypt";

export async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}