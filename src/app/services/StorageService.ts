const DEFAULT_KEY_SUFFIX = "mr-fox";

export const STORAGE_KEYS = {
  IS_BLACKLISTED_STORAGE: "is-blacklisted",
};

const generateKey = (key: string): string => {
  return `${DEFAULT_KEY_SUFFIX}.${key}`;
};

export const setItem = (key: string, value: object): void => {
  localStorage.setItem(generateKey(key), JSON.stringify(value));

  return;
};

export const getItem = (key: string): object => {
  const item = localStorage.getItem(generateKey(key));

  if (!item) {
    return {};
  }

  try {
    return JSON.parse(item);
  } catch (error) {
    console.log("Error while parsing local storage item:", item);
    return {};
  }
};

export const deleteItem = (key: string): void => {
  localStorage.removeItem(generateKey(key));
  return;
};
