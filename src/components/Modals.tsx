import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import Modal from './Modal';
import { removeModal } from '../store/actions/modals';
import { RootAction } from '../store/actions';
import { modalsSelector } from '../store/selectors/modals';

const Modals: React.FunctionComponent = () => {
  const modals = useSelector(modalsSelector);
  const dispatch: Dispatch<RootAction> = useDispatch();

  return (
    <>
      {modals.map((modal) => (
        <Modal
          modal={modal}
          onModalClose={(modalId: string) => dispatch(removeModal(modalId))}
          key={modal.id}
        />
      ))}
    </>
  );
};

export default Modals;
