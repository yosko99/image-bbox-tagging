import { atom } from 'jotai';

import defaultTagValues from '../data/defaultTagValue';
import { ITag } from '../interfaces/ITag';

export const currentTagAtom = atom<ITag>(defaultTagValues);
