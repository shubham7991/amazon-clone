/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "fakestoreapi.com",                // fake store API
      "lh3.googleusercontent.com",       // Google profile pics
      "your-supabase-project.supabase.co", // Supabase images
      "images-eu.ssl-images-amazon.com", // Amazon EU image CDN
      "m.media-amazon.com"               // (Optional: another Amazon CDN often used)
    ],
  },
};

export default nextConfig;
