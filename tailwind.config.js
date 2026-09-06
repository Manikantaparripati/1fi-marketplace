/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        '1fi-blue': '#0066FF',
        '1fi-blue-hover': '#0052CC',
        '1fi-gray-50': '#F9FAFB',
        '1fi-gray-100': '#F3F4F6',
        '1fi-gray-200': '#E5E7EB',
        '1fi-gray-800': '#1F2937',
      }
    },
  },
  plugins: [],
}
