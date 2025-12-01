export const  API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "development"
    ? "https://api.mplats.se"
    : "https://api.mplats.se");


