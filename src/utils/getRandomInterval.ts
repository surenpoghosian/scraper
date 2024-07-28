/**
 * Generates a random integer between the specified minimum and maximum values, inclusive.
 * 
 * @param min - The minimum value for the random number.
 * @param max - The maximum value for the random number.
 * @returns A random integer between `min` and `max`.
 */
const getRandomInterval = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default getRandomInterval;
