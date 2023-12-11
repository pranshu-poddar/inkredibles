import zod from "zod";

const envSchema = zod.object({
  DATABASE_URL: zod.string().min(1),
  NODEMAILER_MAIL: zod.string().min(1),
  NODEMAILER_PASS: zod.string().min(1),
});

export const env = envSchema.parse(process.env);
