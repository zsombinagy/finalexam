import {z} from "zod"

export const QueryMinAndMaxSchema = z.object({ min: z.coerce.number(), max: z.coerce.number() })

export const QueryIncludesSchema = z.object({includes: z.string()}) 