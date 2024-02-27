/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sssm': '320px',
        'ssm': '500px',
        'smd': '900px',
        // 'md':'900px',
        // 'lg':'1024px',
        'xl': '1240px',
        // '2xl': '1280px', // Add a custom 2xl breakpoint
        // Add a custom 3xl breakpoint
      },
      borderWidth: {
        '1': '1px',
      },
      fontFamily: {
        'sans': ['Inter', 'Helvetica', 'Arial', 'sans'],
        'serif': ['Great Vibes', 'serif'],
      },
      boxShadow: {
        'sm': '0 1px 4px 0 rgba(0, 0, 0, 0.08)',
      },
    },
    container: {
      center: true,
    },
  },

  plugins: [],
}

