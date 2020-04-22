export const REG_EX_PATTERNS = {
  // tslint:disable-next-line
  EMAIL: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
  USERNAME: /^[a-zA-Z0-9]*$/,
  PASSWORD: /^[a-zA-Z0-9!@#$%^&*\-_.]*$/,
  MOBILE: /^[0-9]{10,11}$/,
  ONE_UPPER_CASE: /[A-Z]/,
  ONE_LOWER_CASE: /[a-z]/,
  ONE_NUMBER: /[0-9]/,
  ONE_SPECIAL_CHARACTER: /^[a-zA-Z0-9_.-]*$/,
  ALLOWED_CHARACTER: /[\s]/,
  NOT_ALLOWED_REPEATING_CHARACTER: /^([a-z])\1+$/,
  US_ZIP_CODE_WITH_FIVE_DIGITS: /^(?=.*\d)(?=.*[1-9]).{5,10}$/, // added new regex for zipCode
  US_ZIP_CODE_WITH_TEN_DIGITS: /^(?=.*\d)(?=.*[1-9]).{10}$/,
  WHITE_SPACE: /\s/g,
  INVITER_CODE: /[aA-zZ0-9]{6}/,
  INVITER_EMAIL: /^\w+@\w+\.\w{2,3}$/,
  INVITER_EMAIL_OR_CODE: /^(?:[aA-zZ0-9]{6}|\w+@\w+\.\w{2,3})$/,
  ALPHA_NUMERIC_WITH_SPACE: /^[a-z\d\s]+$/i,
  US_ZIP_CODE: /^\d{5}$|^\d{5}-\d{4}$/,
  ALPHABETICAL: /[^a-zA-Z ]/g, // ALPHABETICAL input pattern
  ONE_SPACE: /\s\s+/g, // one space only pattern
  ONLY_NUMBER: /\D/g, // only numbers,
  COMMA_OPERATOR: /,/g, // all comma in a string
  NO_SECIAL_CHARACTER: /[&\/\\#,+()$~%.'":*?<>{}-]/g, // no special character
  PHONE_MASK: /[\/\D/g\/\s/g\-\(\)']+/g, // only for phone mask
  ALLOW_ONLY_NUMBERS: /[^0-9]/g,
  ALLOW_ONLY_NUMBERS_AND_DOT: /[^0-9.]/g,
  NOT_ALLOW_COMMA: /(^,*)/g,
  MONEY_WITH_COMMA: /^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,3})*/,
  SSN_NO: /[^0-9]/g
};
