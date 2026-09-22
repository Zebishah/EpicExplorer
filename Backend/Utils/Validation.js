import validator from "validator";

export const normalizeText = (value) =>
  typeof value === "string" ? value.trim() : "";

export const normalizeEmail = (value) => normalizeText(value).toLowerCase();

export const isValidEmail = (value) =>
  Boolean(value) && validator.isEmail(normalizeEmail(value));

export const isValidUsername = (value) =>
  /^[A-Za-z0-9_]{3,30}$/.test(normalizeText(value));

export const passwordValidationError = (value) => {
  const password = typeof value === "string" ? value : "";
  if (!password) return "Password is required.";
  if (password.length < 10) return "Password must be at least 10 characters long.";
  if (!/[A-Z]/.test(password)) return "Password must include an uppercase letter.";
  if (!/[a-z]/.test(password)) return "Password must include a lowercase letter.";
  if (!/\d/.test(password)) return "Password must include a number.";
  if (!/[^A-Za-z0-9]/.test(password)) return "Password must include a special character.";
  return "";
};

export const isValidPhone = (value) =>
  /^\+?[\d\s().-]{7,20}$/.test(normalizeText(value));

export const bookingValidationError = ({
  bookerName,
  bookerEmail,
  bookerPhone,
  bookerAddress,
  members,
  days,
  guests,
}) => {
  if (!normalizeText(bookerName)) return "Booker name is required.";
  if (!isValidEmail(bookerEmail)) return "Enter a valid booking email address.";
  if (!isValidPhone(bookerPhone)) return "Enter a valid booking phone number.";
  if (!normalizeText(bookerAddress)) return "Booking address is required.";
  const people = members ?? guests;
  if (!Number.isInteger(Number(people)) || Number(people) < 1 || Number(people) > 100) {
    return "Number of guests must be between 1 and 100.";
  }
  if (days !== undefined && (!Number.isInteger(Number(days)) || Number(days) < 1 || Number(days) > 365)) {
    return "Number of days must be between 1 and 365.";
  }
  return "";
};

export const amountValidationError = (value) => {
  const amount = Number(value);
  if (!Number.isFinite(amount) || amount <= 0) return "Amount must be greater than zero.";
  if (amount > 1000000000) return "Amount is above the allowed limit.";
  return "";
};
