import { RootAction } from 'store/actions';
import { addModal, removeModal } from 'store/actions/modals';
import { getType } from 'typesafe-actions';
import type { ModalData } from 'types/modal';

export type State = {
  modalsById: { [modalId: string]: ModalData };
  modalIds: string[];
};

export const initialState: State = {
  modalsById: {},
  modalIds: [],
};

const reducer = (state: State = initialState, action: RootAction): State => {
  switch (action.type) {
    case getType(addModal):
      return {
        ...state,
        modalsById: {
          ...state.modalsById,
          [action.payload.id]: {
            id: action.payload.id,
            title: action.payload.title,
            description: action.payload.description,
            modalButtons: action.payload.modalButtons,
            closeOnOverlayClick: action.payload.closeOnOverlayClick,
            closeOnEsc: action.payload.closeOnEsc,
            closeOnSelection: action.payload.closeOnSelection,
          },
        },
        modalIds: [...state.modalIds, action.payload.id],
      };

    case getType(removeModal): {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { [action.payload.id]: _, ...newModalsById } = state.modalsById;

      return {
        ...state,
        modalsById: newModalsById,
        modalIds: state.modalIds.filter((modalId) => modalId !== action.payload.id),
      };
    }

    default:
      return state;
  }
};

export default reducer;
