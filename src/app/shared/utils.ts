import { Card, LeaderboardEntry } from './models';
import { DEFAULT_NAMES } from './constants';

export function compose(...fns: ((data: any) => any)[]) {
  return (deckSize: number): Card[] => fns.reduceRight((g, f) => f(g), deckSize);
}

export function getBaseID([id]: string): string {
  return id;
}

export function getRandomName(): string {
  return DEFAULT_NAMES[Math.floor(Math.random() * DEFAULT_NAMES.length)];
}

export function mapGetResponse({
  leaderboard,
}: {
  leaderboard: LeaderboardEntry[];
}): LeaderboardEntry[] {
  return leaderboard;
}

export function mapPutResponse({
  data: { leaderboard },
}: {
  data: { leaderboard: LeaderboardEntry[] };
}): LeaderboardEntry[] {
  return leaderboard;
}
