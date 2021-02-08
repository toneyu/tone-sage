import { ActionType } from 'typesafe-actions';
// Dependency cycle due to recursive type,
// and this does not affect the runtime of the code.
/* eslint-disable import/no-cycle */
import * as auth from './auth';
import * as modals from './modals';
/* eslint-enable import/no-cycle */

export const actions = { auth, modals };

export type RootAction = ActionType<typeof actions>;
