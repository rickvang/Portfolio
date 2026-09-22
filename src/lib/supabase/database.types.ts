// This is the checked-in type contract for the initial migration.
// Regenerate it from a local Supabase database with `pnpm supabase:types`.
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      posts: {
        Row: {
          author_id: string | null;
          content: string;
          created_at: string;
          excerpt: string | null;
          id: string;
          metadata: Json;
          published_at: string | null;
          slug: string;
          status: "draft" | "published" | "archived";
          title: string;
          updated_at: string;
        };
        Insert: {
          author_id?: string | null;
          content: string;
          created_at?: string;
          excerpt?: string | null;
          id?: string;
          metadata?: Json;
          published_at?: string | null;
          slug: string;
          status?: "draft" | "published" | "archived";
          title: string;
          updated_at?: string;
        };
        Update: {
          author_id?: string | null;
          content?: string;
          created_at?: string;
          excerpt?: string | null;
          id?: string;
          metadata?: Json;
          published_at?: string | null;
          slug?: string;
          status?: "draft" | "published" | "archived";
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      post_status: "draft" | "published" | "archived";
    };
    CompositeTypes: Record<string, never>;
  };
};
