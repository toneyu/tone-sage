import { createSelector } from 'reselect';
import { RootState } from '../reducers';

export const modalIdsSelector = (state: RootState) => state.modals.modalIds;

export const modalsByIdSelector = (state: RootState) => state.modals.modalsById;

export const modalsSelector = createSelector(
  [modalIdsSelector, modalsByIdSelector],
  (modalIds, modalsById) => modalIds.map((modalId) => modalsById[modalId]),
);
