import { readLocalStorage, saveLocalStorage } from '../utilities/utils';

const KEY = 'daisyhub/bulletin-history';

type BulletinEntry =
  | {
      kind: 'Host';
      ownerId: string;
      bulletinId: string;
    }
  | {
      kind: 'Visitor';
      visitorId: string;
      bulletinId: string;
    };

export function readOwnerId(bulletinId: string): string | null {
  const entries = readLocalStorage<BulletinEntry[]>(KEY);
  const entry = entries?.find(entry => entry.kind === 'Host' && entry.bulletinId === bulletinId);

  return entry?.kind === 'Host' ? entry.ownerId : null;
}

export function readVisitorId(bulletinId: string): string | null {
  const entries = readLocalStorage<BulletinEntry[]>(KEY);
  const entry = entries?.find(entry => entry.kind === 'Visitor' && entry.bulletinId === bulletinId);

  return entry?.kind === 'Visitor' ? entry.visitorId : null;
}

export function saveOwnerToHistory(bulletinId: string, ownerId: string): void {
  const entries = readLocalStorage<BulletinEntry[]>(KEY) || [];
  const updated = entries.concat({ kind: 'Host', ownerId, bulletinId });

  saveLocalStorage<BulletinEntry[]>(KEY, updated);
}

export function removeOwnerFromHistory(ownerId: string): void {
  const entries = readLocalStorage<BulletinEntry[]>(KEY) || [];
  const updated = entries.filter(entry => entry.kind === 'Visitor' || entry.ownerId !== ownerId);

  saveLocalStorage<BulletinEntry[]>(KEY, updated);
}

export function saveVisitorToHistory(bulletinId: string, visitorId: string): void {
  const entries = readLocalStorage<BulletinEntry[]>(KEY) || [];
  const updated = entries.concat({ kind: 'Visitor', visitorId, bulletinId });

  saveLocalStorage<BulletinEntry[]>(KEY, updated);
}

export function removeVisitorFromHistory(visitorId: string): void {
  const entries = readLocalStorage<BulletinEntry[]>(KEY) || [];
  const updated = entries.filter(entry => entry.kind === 'Host' || entry.visitorId !== visitorId);

  saveLocalStorage<BulletinEntry[]>(KEY, updated);
}
