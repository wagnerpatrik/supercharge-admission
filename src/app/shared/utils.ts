import { Card } from './models';

export function compose(...fns: ((data: any) => any)[]) {
  return (deckSize: number): Card[] => fns.reduceRight((g, f) => f(g), deckSize);
}
