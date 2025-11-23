// Global registry manager to store modal registries outside of Redux
const registries = {};

export const registerModalRegistry = (key, registry) => {
  registries[key] = registry;
};

export const getModalRegistry = (key) => {
  return registries[key] || null;
};
