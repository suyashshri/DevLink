import z from "zod";

export const CreateProjectType = z.object({
  name: z.string(),
  description: z.string().optional(),
  visibility: z.enum(["public", "private"]),
});
