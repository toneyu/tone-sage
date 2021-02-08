import { ActionType } from 'typesafe-actions';
// Dependency cycle due to recursive type,
// and this does not affect the runtime of the code.
/* eslint-disable import/no-cycle */
import * as auth from './auth';
/* eslint-enable import/no-cycle */

export const actions = { auth };

export type RootAction = ActionType<typeof actions>;
