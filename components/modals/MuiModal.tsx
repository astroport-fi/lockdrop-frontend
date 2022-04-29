import React, { FC } from 'react';
import { Box, Modal } from '@mui/material';
import styles from './Modals.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const MuiModal: FC<Props> = ({ isOpen, onClose, children }) => {
  return (
    <Modal
      BackdropProps={{
        classes: {
          root: styles.backDrop
        }
      }}
      open={isOpen}
      onClose={onClose}>
      <Box className={styles.modalWrapper}>
        <Box className={styles.modalContent}>{children}</Box>
      </Box>
    </Modal>
  );
};

export default MuiModal;
