// UTILITIES

import { With as MiniWith } from 'miniplex'
import { typescriptXR } from './typescriptXR'

/**
 * A utility type that improves readability of the returned type
 * FROM:
 * const card: With<{
 *  id?: string | undefined;
 *  isCard?: boolean | undefined;
 *  three?: Object3D<Event> | undefined;
 * }, "id" | "isCard">
 *
 * TO:
 * const card: {
 *  id: string;
 *  isCard: boolean;
 *  three?: Object3D<Event> | undefined;
 * }
 *
 *  */
export type With<E, P extends keyof E> = typescriptXR<MiniWith<E, P>>
