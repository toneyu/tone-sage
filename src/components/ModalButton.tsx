import { Button } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { removeModal } from 'store/actions/modals';
import { ActionButton as ActionButtonType } from 'types/modal';
import { RootAction } from '../store/actions';

const ModalButton: React.FunctionComponent<{
  actionButton: ActionButtonType;
  modalId: string;
  closeOnSelection?: boolean;
}> = ({ actionButton, modalId, closeOnSelection }) => {
  const dispatch: Dispatch<RootAction> = useDispatch();
  const handleClick = useCallback(() => {
    if (actionButton.onClick !== undefined) {
      actionButton.onClick(dispatch, modalId);
    }
    if (closeOnSelection) {
      dispatch(removeModal(modalId));
    }
  }, [actionButton, dispatch, modalId, closeOnSelection]);
  return <Button onClick={handleClick}>{actionButton.label}</Button>;
};

export default ModalButton;
