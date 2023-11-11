export const validateInput = (
  value: string,
  type: { [key: string]: boolean },
  setError: (value: string) => void,
  data?: { [key: string]: string }
) => {
  if (value.trim().length === 0) {
    setError("(required)");
    return false;
  }
  if (
    type.email &&
    !value.trim().match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
  ) {
    setError("(invalid email format)");
    return false;
  }
  if (type.password) {
    if (value.trim().length < 8) {
      setError("(minimum 8 characters required)");
      return false;
    }

    if (value.trim().includes(" ")) {
      setError("(white spaces are not allowed)");
      return false;
    }
  }
  if (type.name) {
    if (value.trim().length < 3) {
      setError("(minimum 3 characters required)");
      return false;
    }
  }
  if (type.confirmPassword && data) {
    if (value.trim() !== data.password) {
      setError("(passwords do not match)");
      return false;
    }
  }
  setError("");
  return true;
};
