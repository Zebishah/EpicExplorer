const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const USERNAME_PATTERN = /^[A-Za-z0-9_]{3,30}$/;
const PHONE_PATTERN = /^\+?[\d\s().-]{7,20}$/;

export const normalize = (value) => String(value ?? "").trim();

export const validateEmail = (value) => {
  const email = normalize(value);
  if (!email) return "Email address is required.";
  if (!EMAIL_PATTERN.test(email)) {
    return "Enter a valid email address, for example name@example.com.";
  }
  return "";
};

export const validateUsername = (value) => {
  const username = normalize(value);
  if (!username) return "Username is required.";
  if (!USERNAME_PATTERN.test(username)) {
    return "Username must be 3–30 characters and use only letters, numbers, or underscores (no spaces).";
  }
  return "";
};

export const validatePassword = (value) => {
  const password = String(value ?? "");
  if (!password) return "Password is required.";
  if (password.length < 10) {
    return "Password must be at least 10 characters long.";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must include at least one uppercase letter.";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must include at least one lowercase letter.";
  }
  if (!/\d/.test(password)) {
    return "Password must include at least one number.";
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    return "Password must include at least one special character.";
  }
  return "";
};

export const validateConfirmPassword = (password, confirmation) => {
  if (!String(confirmation ?? "")) return "Please confirm your password.";
  if (password !== confirmation) return "Passwords do not match.";
  return "";
};

export const validatePhone = (value) => {
  const phone = normalize(value);
  if (!phone) return "Phone number is required.";
  if (!PHONE_PATTERN.test(phone)) {
    return "Enter a valid phone number using 7–20 digits.";
  }
  return "";
};

export const validateText = (label, value, { min = 1, max = 255 } = {}) => {
  const text = normalize(value);
  if (!text) return `${label} is required.`;
  if (text.length < min) return `${label} must be at least ${min} characters.`;
  if (text.length > max) return `${label} must be ${max} characters or fewer.`;
  return "";
};

export const getErrorMessage = (error, fallback = "Something went wrong.") => {
  if (typeof error === "string" && error.trim()) return error;
  if (error?.message && typeof error.message === "string") return error.message;
  return fallback;
};
