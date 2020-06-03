import { Card } from './models';
import { DEFAULT_NAMES } from './constants';

export function compose(...fns: ((data: any) => any)[]) {
  return (deckSize: number): Card[] => fns.reduceRight((g, f) => f(g), deckSize);
}

export function getBaseID(id: string): string {
  return id[0];
}

export const getRandomName = () =>
  DEFAULT_NAMES[Math.floor(Math.random() * DEFAULT_NAMES.length)];
