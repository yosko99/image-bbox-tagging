import { atom } from 'jotai';

import { ITag } from '../interfaces/ITag';

export const upNextImagesAtom = atom<ITag[]>([]);
