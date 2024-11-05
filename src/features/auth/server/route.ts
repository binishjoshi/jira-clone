import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { signInSchema, signUpSchema } from "../schemas";

const app = new Hono()
  .post("/sign-in", zValidator("json", signInSchema), async (c) => {
    const { email, password } = c.req.valid("json");
    console.log(email, password);
    return c.json({ email, password });
  })
  .post("/sign-up", zValidator("json", signUpSchema), async (c) => {
    const { email, name, password } = c.req.valid("json");
    console.log(email, password);
    return c.json({ email, name, password });
  });

export default app;
