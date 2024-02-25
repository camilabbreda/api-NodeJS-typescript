export function isJsonValid(jsonstring: string): boolean {
  try {
    JSON.parse(jsonstring);
    return true;
  } catch (error) {
    return false;
  }
}
