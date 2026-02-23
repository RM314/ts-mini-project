import { z } from "zod";

// // deprecated! 
//  export type DiaryEntry = {
//   id: string;
//   date: string;
//   title: string;
//   text: string;
//   imageUrl: string;
// };

// to be used in localStorage
export type FavoriteArtwork = {
  artworkId: number;
  notes: string | null;
};

export const ArtworkSchema = z .object({

    id: z.coerce.number().int().nonnegative(),

    title: z
      .string()
      .trim()
      .min(1)
      .catch("Untitled"),

    artist_title: z
      .string()
      .trim()
      .min(1)
      .catch("Unknown artist"),

    // image_id kann null sein, wenn es kein Bild gibt
    image_id: z
      .string()
      .trim()
      .min(1)
      .nullable()
      .catch(null),

      notes: z.string().nullable().catch(null),
  })
  .strip();

export type Artwork = z.infer<typeof ArtworkSchema>;

export type NewEntryInput = Omit<DiaryEntry, "id">;
