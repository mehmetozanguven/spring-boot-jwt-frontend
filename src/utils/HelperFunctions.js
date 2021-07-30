export const isValueEmpty = (value) => {
  return (
    typeof value == "undefined" ||
    value == null ||
    value == false ||
    value.length == 0 ||
    value == "" ||
    Object.keys(value).length === 0
  );
};
