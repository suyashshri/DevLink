import z from "zod";

export const CreateProjectType = z.object({
  name: z.string(),
  description: z.string().optional(),
  visibility: z.enum(["public", "private"]),
});

export const CreateFolderType = z.object({
  name: z.string(),
  parentFolderId: z.string().optional(),
});

export const UpdateFolderType = z.object({
  name: z.string(),
});
