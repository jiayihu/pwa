import { Island } from './island';

export type BulletinBody = {
  dodo: string;
  island: Island;
  time: string;
  turnipPrice: number;
  description: string;
  preferences: {
    concurrent: number;
    queue: number;
    hasFee: boolean;
    isPrivate: boolean;
  };
};

export interface Bulletin {
  id: string;
  ownerId: string;
  queue: {
    isLocked: boolean;
  };
  meta: {
    creationDate: string;
  };
  dodo: string;
  island: Island;
  time: string;
  turnipPrice: number;
  description: string;
  preferences: {
    concurrent: number;
    queue: number;
    hasFee: boolean;
    isPrivate: boolean;
  };
}
