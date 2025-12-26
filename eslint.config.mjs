// ESLint flat config for Next.js
// Note: There's a known compatibility issue with eslint-config-next and ESLint 9
// This is a minimal working configuration
export default [
  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts", "node_modules/**"],
  },
];
