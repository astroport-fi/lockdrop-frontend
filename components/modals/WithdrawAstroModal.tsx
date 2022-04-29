import React, { FC, useState } from 'react';
import { Box, Image, Button } from '@chakra-ui/react';
import { Grid, useTheme, useMediaQuery } from '@mui/material';
import Modal from 'components/modals/MuiModal';
import NumericalInput from 'components/NumericalInput';
import StyledSlider from 'components/StyledSlider';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { white95, almostBlack, gold, buttonGrey } from '../../theme/mui-theme';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const WithdrawAstroModal: FC<Props> = ({ isOpen, onClose }) => {
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('sm'));
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Box className="panel">
        <Box p="16px">
          <Box className="backIcon" onClick={onClose}>
            <ChevronLeftIcon fontSize={28} />
          </Box>
          <Box textAlign="center">
            <h6 className="color-primary obviouslyFont">Withdraw xASTRO</h6>
          </Box>
        </Box>
        <Box h={1} className="border"></Box>
        <Box p="16px">
          <p className="color-secondary">
            Select how much xASTRO you want to withdraw from Apollo’s xASTRO
            Lockdrop. Starting from day 6, you will only be able to withdraw up
            to 50% of your xASTRO deposits. On day 7, withdrawal allowance will
            fall linearly from 50% to 0%.
          </p>
        </Box>
      </Box>
      <Box className="panel" mt="16px" p="16px">
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <p className="color-primary">Withdraw</p>
          <p className="color-secondary">
            Withdrawable: <span className="color-link">15,000</span>
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
            <NumericalInput
              value={withdrawAmount}
              onUserInput={setWithdrawAmount}
            />
            <small className="color-secondary">$4,375.00</small>
          </Box>
        </Box>
        <Box mt="16px">
          <StyledSlider
            value={Number(withdrawAmount)}
            setValue={(val) => setWithdrawAmount(val.toString())}
            maxValue={1000}
            maxString="Max"
          />
        </Box>
      </Box>
      <Box className="panel" mt="16px" p="16px">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6}>
            <p className="color-primary">Lock Period</p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box className="panel1" py="8px" px="12px">
              <Box display="flex" alignItems="center" justifyContent="flex-end">
                <h2 className="color-primary">3</h2>
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
      </Box>
      <Grid container mt="16px" py="12px" px="16px" className="panel1 bg-main">
        <Grid item xs={12} sm={6}>
          <Box display="flex" alignItems="center">
            <Image src="/apollo.png" width={20} />
            <Box ml="6px">
              <p className="color-primary">6,350.00</p>
            </Box>
          </Box>
          <small className="color-secondary">Est. APOLLO Rewards</small>
        </Grid>
        <Grid item container xs={12} sm={6}>
          {!isMobile && <Box width="1px" className="border" />}
          <Box mt={isMobile ? '12px' : 0} ml={isMobile ? 0 : '16px'}>
            <p className="color-primary">0.375%</p>
            <small className="color-secondary">
              Est. % of Lockdrop Rewards
            </small>
          </Box>
        </Grid>
      </Grid>
      <Box textAlign="center" mt="16px">
        <Button
          maxWidth={192}
          width="100%"
          borderRadius={15}
          height={45}
          fontSize={13}
          fontFamily="Obviously, sans-serif"
          backgroundColor={gold}
          color={almostBlack}
          backgroundHoverColor={buttonGrey}
          hoverColor={white95}>
          Withdraw xASTRO
        </Button>
        <Box mt="8px">
          <small className="color-secondary">TX Fee: 0.25 UST</small>
        </Box>
      </Box>
    </Modal>
  );
};

export default WithdrawAstroModal;
