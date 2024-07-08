import CryptoJS from "crypto-js";

export const randId = () => "id" + Math.random().toString(16).slice(2);

export const rand = () => {
  return Math.random().toString(36).substr(2); // remove `0.`
};

export const token = () => {
  return rand() + rand(); // to make it longer
};

export const encryptTxt = (pass) => {
  return CryptoJS.AES.encrypt(
    pass,
    process.env.REACT_APP_ENCRYPT_SECRET
  ).toString();
};

export const decryptTxt = (txt = "") => {
  try {
    const bytes = CryptoJS.AES.decrypt(
      txt,
      process.env.REACT_APP_ENCRYPT_SECRET
    );
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.log("error", error);
    return txt;
  }
};
