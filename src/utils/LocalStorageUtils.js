const JWT_TOKEN_ITEM_KEY = "j_token";
const DEFAULT_EXPIRY_TIME_IN_MS = 60000 * 5; // 60.000 = 60 seconds,

export const getJwtFromStorage = () => {
  return getItem(JWT_TOKEN_ITEM_KEY);
};

export const setJwtTokenInStorage = (jwtToken) => {
  setItemWithDefaultExpiry(JWT_TOKEN_ITEM_KEY, jwtToken);
};

export const removeJwtTokenFromStorage = () => {
  console.log("remove");
  localStorage.removeItem(JWT_TOKEN_ITEM_KEY);
};

export const getItem = (itemKey) => {
  const wrapperItemInStorage = localStorage.getItem(itemKey);
  if (!wrapperItemInStorage) {
    return "";
  }

  let localStorageItem = "";

  try {
    localStorageItem = JSON.parse(wrapperItemInStorage);
  } catch (error) {
    console.log("localStorage jsonParse: ", error);
    localStorage.removeItem(itemKey);
    return "";
  }

  const now = new Date();
  if (now.getTime() > localStorageItem.expiryTime) {
    localStorage.removeItem(itemKey);
    return "";
  } else {
    return localStorageItem.value;
  }
};

export const setItemWithDefaultExpiry = (key, value) => {
  setItemWithExpiration(key, value, DEFAULT_EXPIRY_TIME_IN_MS);
};

const setItemWithExpiration = (key, value, expiryTimeInMs) => {
  const now = new Date();
  const localStorageItem = {
    value: value,
    expiryTime: now.getTime() + expiryTimeInMs,
  };
  localStorage.setItem(key, JSON.stringify(localStorageItem));
};
