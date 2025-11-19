export type NavItem = {
  name: string;
  path: string;
  subItems?: NavItem[];
};

// src/types/content.ts

// ---------- USER ----------
export interface User {
  id: string;
  email: string;
  role: "ADMIN" | "EDITOR" | "USER";
  firstName?: string | null;
  lastName?: string | null;
  avatarUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

// ---------- MEDIA ----------
export interface Media {
  id: string;
  url: string;
  mediaType: "IMAGE" | "VIDEO";
  title?: string | null;
  description?: string | null;
  altText?: string | null;
  createdAt: string;
  updatedAt: string;
}

// ---------- NEWS ----------
export interface Article {
  id: string;
  slug?: string | null;
  publishedDate: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  createdById?: string | null;

  title: string;
  description?: string | null;
  content?: string | null;
  language: string; // "Swedish", could be enum later
  imageHint: string;
  creator?: User | null;
  media: Media[];
}

// ---------- EVENT ----------
export interface Event {
  id: string;
  slug?: string | null;
  startDate: string;
  endDate?: string | null;
  location?: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  createdById?: string | null;
  imageHint: string;
  title: string;
  description?: string | null;
  content?: string | null;
  language: string;

  creator?: User | null;
  media: Media[];
}

// ---------- PROJECT ----------

export interface Project {
  id: string;
  slug: string;
  isPublished: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  createdById?: string | null;

  title: string;
  description?: string | null;
  content?: string | null;
  language: string;
  category: "LOCAL" | "EU";          // ✅ Include category
  imageHint: string;                 // ✅ New field

  creator?: User | null;             // Optional populated user
  media: Media[];                    // ✅ List of attached media files
}

// ---------- PARTNER ----------
export type PartnerType = "FINANCIER" | "COLLABORATOR" | "EU_PROJECT" | "INTERNATIONAL_PROJECT";

export interface Partner {
  id: string;
  slug?: string | null;
  name: string;
  website?: string | null;
  logoUrl?: string | null;
  type: PartnerType;
  isPublished: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
  language: string;
  description?: string | null;
  imageHint: string;
  media: Media[];
}

// ---------- CONTACT MESSAGE ----------
export type ContactStatus = "UNREAD" | "READ" | "REPLIED" | "ARCHIVED";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  status: ContactStatus;
  createdAt: string;
  updatedAt: string;
}

export type YouthTestimonial = {
  id: string;
  name: string;
  age: number;
  message: string;
  program: string;
  imageUrl: string;
  imageHint: string;
  isPublished: boolean;
  createdAt: string;
};