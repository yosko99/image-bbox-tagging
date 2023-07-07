import { atom } from 'jotai';
import { Stage } from 'konva/lib/Stage';

// @ts-ignore
export const hiddenCanvasRefAtom = atom<Stage>(null);
