/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    screens: {
      'sssm': '320px',
      'ssm': '500px',
      'smd': '700px',
      'md': '960px',
      'lg': '1078px',
      'xl': '1180px',
      '2xl': '1240px', // Add a custom 2xl breakpoint
      // Add a custom 3xl breakpoint
    },
    borderWidth: {
      '1': '1px',
    },
    fontFamily: {
      'sans': ['Inter', 'Helvetica', 'Arial', 'sans'],
      'serif': ['Great Vibes', 'serif'],
      'radios': ['Radio Canada Big', 'sans-serif'],
      'joining': ['Satisfy', 'cursive']
    }, colors: {
      'light-black': 'rgb(20, 20, 19)',
      'fade-black': 'rgb(28, 28, 26)',
      'yellows': 'rgb(229, 255, 0)'
    },
    boxShadow: {
      'sm': '0 1px 4px 0 rgba(0, 0, 0, 0.08)',
      'lg': '0px 5px 15px rgba(0, 0, 0, 0.35)',
      'md': '5px 5px px 2px rgba(0, 0, 0, 0.35)'
      // box- shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }, backgroundImage: {
      'hero-image': "url('../EpicExplorerFrontend/src/images/marc-zimmer-a5QnUtau8lo-unsplash.jpg')", // Adjust the path to your image
    }
  },
  container: {
    center: true,
  },
};
export const plugins = [];

