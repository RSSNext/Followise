export default {
  plugins: {
    tailwindcss: {},
    'tailwindcss/nesting': {},

    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
    autoprefixer: {},
  },
}
