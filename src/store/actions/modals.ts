import shortid from 'shortid';
import { createAction } from 'typesafe-actions';
import { Optional } from 'utility-types';
import type { ActionButton } from '../../@types/modal';

// TODO: Consider a wrapper function that takes in a callback with id as its parameter
export const addModal = createAction(
  ' modals/ADD_MODAL',
  (
    title: React.ReactNode,
    description: React.ReactNode,
    modalButtons: Optional<ActionButton, 'key'>[],
    id?: string,
    closeOnEsc = true,
    closeOnOverlayClick = true,
    closeOnSelection = true
  ) => {
    const modalButtonsWithKeys: ActionButton[] = modalButtons.map(
      (actionButton) =>
        (actionButton.key === undefined
          ? { ...actionButton, key: shortid() }
          : actionButton) as ActionButton
    );
    return {
      title,
      description,
      modalButtons: modalButtonsWithKeys,
      id: id || shortid(),
      closeOnEsc,
      closeOnOverlayClick,
      closeOnSelection,
    };
  }
)();

export const removeModal = createAction(
  'modals/REMOVE_MODAL',
  (id: string) => ({ id })
)();
