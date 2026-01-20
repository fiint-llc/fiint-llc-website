import nextCoreWebVitalsConfig from 'eslint-config-next/core-web-vitals';

const eslintConfig = [
  ...nextCoreWebVitalsConfig,
  {
    rules: {
      '@next/next/no-img-element': 'off',
    },
  },
];

export default eslintConfig;
