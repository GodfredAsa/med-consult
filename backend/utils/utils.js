import { EMAIL_PATTERN, PASSWORD_PATTERN, DATE_PATTERN } from "./validators-regex.js";

export const isValidEmail = email => {
  return EMAIL_PATTERN.test(email);
}

export const isValidPassword = password => {
    return PASSWORD_PATTERN.test(password);
}

export const isValidateDate = date => {
    DATE_PATTERN.test(date);
}
