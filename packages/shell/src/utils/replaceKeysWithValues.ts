const replaceKeysWithValue = (
  inputString: string,
  replacementObject: Record<string, string>
): string => {
  for (const [key, value] of Object.entries(replacementObject)) {
    inputString = inputString.split(key).join(value);
  }

  return inputString;
};

export default replaceKeysWithValue;
