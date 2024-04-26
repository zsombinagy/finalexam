import { number, z } from "zod";

export const QueryMinAndMaxSchema = z.object({
  min: z.coerce.number(),
  max: z.coerce.number(),
});

export const QueryIncludesSchema = z.object({ includes: z.string() });

export const DataSchema = z.object({
  id: z.number(),
  name: z.string(),
  pricePerNightInUSD: z.number(),
});
