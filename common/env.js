/** @typedef {{ name: string, baseURL: string }} EnvironmentConfig */

/** @type {Record<string, EnvironmentConfig>} */
const ENVIRONMENTS = {
  prod: {
    name: 'prod',
    baseURL: 'https://www.applyground.work',
  },
};

/**
 * Active target environment. Defaults to prod.
 * Override with TEST_ENV when additional environments are added.
 */
const activeEnv = process.env.TEST_ENV || 'prod';

function getConfig() {
  const config = ENVIRONMENTS[activeEnv];
  if (!config) {
    throw new Error(
      `Unknown TEST_ENV "${activeEnv}". Valid values: ${Object.keys(ENVIRONMENTS).join(', ')}`,
    );
  }
  return config;
}

function getBaseURL() {
  return process.env.APPLYGROUND_BASE_URL || getConfig().baseURL;
}

module.exports = {
  ENVIRONMENTS,
  activeEnv,
  getConfig,
  getBaseURL,
};
