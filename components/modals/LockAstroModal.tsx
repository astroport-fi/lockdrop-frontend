import React, { FC, useState } from 'react';
import { Box, Image } from '@chakra-ui/react';
import { Grid } from '@mui/material';
import Modal from 'components/modals/MuiModal';
import NumericalInput from 'components/NumericalInput';
import StyledSlider from 'components/StyledSlider';
import { ChevronLeftIcon } from '@chakra-ui/icons';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const LockAstroModal: FC<Props> = ({ isOpen, onClose }) => {
  const [lockAmount, setLockAmount] = useState('');
  const [lockPeriod, setLockPeriod] = useState('');
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Box className="panel">
        <Box p="16px">
          <Box className="backIcon" onClick={onClose}>
            <ChevronLeftIcon fontSize={28} />
          </Box>
          <Box textAlign="center">
            <h6 className="color-primary">Lock xASTRO</h6>
          </Box>
        </Box>
        <Box h={1} className="border"></Box>
        <Box p="16px">
          <p className="color-secondary">
            Select how much xASTRO you want to deposit into Apollo’s xASTRO
            Lockdrop and how long you would like to lock it. Note that once
            Stage 2 begins (Day 6) you will not be able to make any xASTRO
            deposits into the Lockdrop.
          </p>
        </Box>
      </Box>
      <Box className="panel" mt="16px" p="16px">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <p className="color-primary">Lock Up</p>
          <p className="color-secondary">
            In wallet: <span className="color-link">2,500</span>
          </p>
        </Box>
        <Box
          py="8px"
          px="12px"
          mt="12px"
          display="flex"
          alignItems="center"
          className="panel1 bg-main">
          <Box display="flex" alignItems="center">
            <Image src="/xastro.png" width={30} />
            <Box ml="6px">
              <h5 className="color-primary">xASTRO</h5>
            </Box>
          </Box>
          <Box flex={1} textAlign="right">
            <NumericalInput value={lockAmount} onUserInput={setLockAmount} />
            <small className="color-secondary">$4,375.00</small>
          </Box>
        </Box>
        <Box mt="16px">
          <StyledSlider
            value={Number(lockAmount)}
            setValue={(val) => setLockAmount(val.toString())}
            maxValue={1000}
            maxString="Max"
          />
        </Box>
      </Box>
      <Box className="panel" mt="16px" p="16px">
        <p className="color-primary">Lock Period</p>
        <Grid mt={0.5} container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <p className="color-secondary">
              The longer you lock, the more APOLLO rewards you will receive.
            </p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box className="panel1" py="8px" px="12px">
              <Box display="flex" alignItems="center">
                <NumericalInput
                  placeholder=""
                  value={lockPeriod}
                  onUserInput={setLockPeriod}
                />
                <Box ml="6px">
                  <h5 className="color-secondary">MONTHS</h5>
                </Box>
              </Box>
              <Box textAlign="right">
                <small className="color-secondary">August 1, 2012</small>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box mt="16px">
          <StyledSlider
            value={Number(lockPeriod)}
            setValue={(val) => setLockPeriod(val.toString())}
            maxValue={12}
            pointValues={['0 Months', '6 Months', '12 Months']}
          />
        </Box>
      </Box>
      <Grid container mt="16px" py="8px" px="16px" className="panel1 bg-main">
        <Grid item xs={12} sm={6}>
          <Box display="flex" alignItems="center">
            <Image src="/apollo.png" width={20} />
            <p className="color-primary">6,350.00</p>
          </Box>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default LockAstroModal;
