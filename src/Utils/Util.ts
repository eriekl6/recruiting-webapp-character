// Given an attribute value, return the modifier value
export const calculateModifier = (attributeValue: number): number => {
  return Math.floor((attributeValue - 10) / 2);
};

// returns a random number in range [1, 20]
export const getRandomNumberForDC = (): number => {
  return Math.floor(Math.random() * 20) + 1;
}
