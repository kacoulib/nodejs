import dotenv from "dotenv";
dotenv.config();

export const port = process.env.PORT || 3000;
export const hostname = process.env.HOSTNAME || "localhost";
export const sessionSecret =
  process.env.SESSION_SECRET || "lkjdsj _sdflsdf sdfsdf98797dsfds$$pm";
