import React from 'react';
import { Box, Container, VStack } from '@chakra-ui/react';

const DisclaimerContent = () => {
  return (
    <Box pt={['10', null, '16', '28']} pb={['16', null, null, '20']}>
      <Container
        maxW="container.xl"
        px={['8', null, '12']}
        color="white"
        className="prose">
        <VStack spacing="34">
          <h1>Astrodrop Disclaimers</h1>
          <VStack spacing="10" align="flex-start">
            <p>
              <i>
                Participation in the Astroport “ASTRO drops” involves
                significant risks and uncertainties. Please be advised that all
                relevant technologies are being provided on an as-is basis,
                without representation, warranty, insurance or indemnity, and
                that all participation is solely at your own sole risk. You
                should carefully review and understand the{' '}
                <a
                  href="https://github.com/astroport-fi/astroport-periphery/blob/main/contracts/lockdrop/src/contract.rs"
                  target="_blank"
                  rel="noreferrer">
                  ASTRO lockdrop code
                </a>{' '}
                and all relevant technologies before participating in the ASTRO
                drop transactions. As noted below, in the event of security
                threats, such code is subject to change after launch by action
                of the Multisig. You should always ensure that you understand
                the specific smart contracts on Terra mainnet (columbus-5)
                blockchain system (the “<strong>Terra</strong>”) that are in
                control of your tokens—the addresses of these smart contracts on
                Terra can be found through the Astroport changelog{' '}
                <a
                  href="https://github.com/astroport-fi/astroport-changelog/tree/master/columbus-5/1.0.0"
                  target="_blank"
                  rel="noreferrer">
                  here
                </a>
                , as it may be updated from time to time.
              </i>
            </p>
            <p>
              <u>Nature of Token Deposits and Locking.</u> When you deposit any
              tokens into Astroport-related smart contracts, you are committing
              such tokens to the sole and absolute control of those smart
              contracts as operated on Terra until such time as you withdraw
              such tokens from such smart contracts.{' '}
              <strong>
                <u>
                  Once your tokens are “locked “in the Astroport smart contract
                  system, you will not be able to withdraw them until the lockup
                  period you selected has expired. During the lockup period, you
                  will lose all powers over and benefits with respect to the
                  locked tokens,
                </u>
              </strong>{' '}
              other than the specific uses that the Astroport smart contract
              systems will make of the locked tokens during the lockup period.
              For further detail regarding when deposited tokens become
              irrevocably locked in the Astroport smart contract system for the
              user-selected period pursuant to the ASTRO lockdrop process, as
              well as details regarding the specific uses that will be made of
              the locked-up tokens by the Astroport smart contract system while
              the tokens are locked, see{' '}
              <a
                href="https://astroport.medium.com/hello-astro-announcing-the-astroport-governance-token-drops-a07a1bf3ed94"
                target="_blank"
                rel="noreferrer">
                “Hello, ASTRO: Announcing the Astroport Governance Token Drops”
              </a>
              .
            </p>
            <p>
              <u>
                Irreversibility of Transactions and Lack of Remedies and
                Insurance for Damages.
              </u>{' '}
              Transactions on Terra are, under normal conditions, irreversible.
              Any tokens you deposit into Astroport-related smart contracts are
              subject to potential risk of permanent disablement, impairment,
              loss or forfeiture in the event of any exploits, bugs or
              malfunctions of the relevant smart contracts or Terra itself, and
              no remedy will be available from any person due to any damages you
              may suffer in connection with your participation in the Astro Drop
              or use of any of the relevant technologies.{' '}
            </p>
            <p>
              <u>
                No Investment or Lending; No Contract Rights; Absence of
                Counterparties.
              </u>{' '}
              The ASTRO drop transactions are not intended to be an investment,
              a capital-raising transaction for an enterprise, a sale of your
              tokens to any person or group of persons or a purchase of ASTRO
              from any person or group of persons. They are also not intended to
              be a loan, consignment or deposit of your tokens to or with, or a
              service provided to you by, any person or group of persons. Your
              deposited and/or locked tokens will not be owned by or under the
              control of any person or group of persons involved in creating
              Astroport, but will be under the control of permanent smart
              contract code on Terra. These smart contracts are operated on an
              unaffiliated basis by the proof-of-stake block validators for
              Terra. However, these validators also do not have individual
              ownership or control of the relevant smart contracts or Terra, and
              such validators lack any obligation or readily available method to
              coordinate a reversal or mitigation of any adverse results or
              damages you may suffer as a result of the operation of such smart
              contracts. There is no ‘transaction counterparty’ which has the
              discretionary power to reverse your transactions or recover your
              tokens or other assets, or which has made you a promise to return
              or refund any disabled, impaired, lost or forfeited assets. There
              is also no private or governmental insurance (on the part of the
              creators of the Astroport smart contract system, Terra validators,
              any nation-state or any other person) available to compensate you
              for any such losses or other adverse circumstances relating to the
              ASTRO drop transactions.{' '}
            </p>
            <p>
              <u>Technical Risks; Independent Due Diligence Required.</u> The
              technologies and assets involved in the ASTRO drop transactions
              are highly experimental and risky, have uncertain and potentially
              volatile value, and should be directly evaluated by experts in
              blockchain technologies before use. Use them solely at your own
              risk. You must not rely on any articles, summaries or published
              code audits as an accurate description or evaluation of the
              Astroport smart contracts or Terra or for purposes of making any
              financial or other decision. Instead, you must only participate in
              the ASTRO drop transactions after thoroughly reviewing and
              understanding the code of the relevant smart contracts and Terra
              in your own independent due diligence process.
            </p>
            <p>
              <u>Multisig-Controlled Proxy Smart Contract Pattern.</u> The ASTRO
              drop smart contracts use a so-called ‘proxy upgradeability’
              pattern governed by a cryptographic multisignature smart contract
              stored on Terra (the “Multisig”). The Multisig, in turn, is
              administered by five natural persons who each hold a private key,
              any three of which may (by signing their respective private keys
              to the same transaction and broadcasting that transaction to Terra
              validators) instruct Terra validators to perform Multisig
              operations.{' '}
              <strong>
                <u>
                  Assuming Terra is operating in the ordinary course, it is
                  possible for the Multisig key holders, through the Multisig,
                  to change which smart contracts govern your locked tokens from
                  the{' '}
                  <a
                    href="https://github.com/astroport-fi/astroport-periphery/blob/main/contracts/lockdrop/src/contract.rs"
                    target="_blank"
                    rel="noreferrer">
                    ASTRO lockdrop code
                  </a>{' '}
                  to any arbitrary smart contract code selected by three or more
                  of the Multisig key holders.
                </u>
              </strong>{' '}
              This discretion of the Multisig key holders constitutes a material
              risk, and could enable your tokens to be misappropriated by the
              Multisig key holders if at least three of them collude.{' '}
              <strong>
                <u>
                  Due to the limitations of existing multisignature smart
                  contract architectures for Terra, there is no ‘timelock’ or
                  other delay feature which would guarantee ASTRO drop
                  participants advanced notice of a code change initiated by the
                  Multisig.
                </u>
              </strong>
            </p>
            <p>
              <u>Multisig Key Holders.</u> The Multisig keyholders are service
              providers of Delphi Labs Ltd., a British Virgin Islands company
              limited by shares (“
              <strong>
                <i>Delphi Labs</i>
              </strong>
              ”). These keyholders have signed a Multisignature Participation
              Agreement with Delphi Labs providing that they will use their
              signature authority in their independent judgment to foster
              Astroport as a public good for the benefit of Astroport users and
              others in the Astroport community. The Multisignature
              Participation Agreement further provides that the Multisig
              keyholders will not use their signature authority to change or
              replace the ASTRO drop smart contract code except to the extent
              necessary to protect ASTRO drop participants from a clear and
              present security threat. However, the existence of the
              Multisignature Participation Agreement does not guarantee that the
              Multisig key holders will comply with its terms, and, due to the
              nature of private-key cryptography, Terra and other relevant
              technologies, the ability and willingness of Delphi Labs to timely
              and effectively enforce the terms of the Multisignature
              Participation Agreement against the Multisig key holders cannot be
              guaranteed and is subject to numerous risks and uncertainties.{' '}
              <strong>
                <u>
                  By participating in the ASTRO drop transactions, you agree to
                  assume to all risks arising from the existence and operation
                  of the Multisig.
                </u>
              </strong>
            </p>
            <p>
              <u>Lack of Governmental Oversight.</u> The ASTRO drop transactions
              and all related facts and circumstances have not been reviewed,
              approved, endorsed or registered with any regulator or other
              governmental entity. The creators of the Astroport smart contract
              system and Terra are not licensed by any regulator or other
              authority to provide any legal, financial, accounting, investment
              or other advice or services.
            </p>
            <p>
              <u>ASTRO Builder Allocation & Associated Risks.</u> Astroport was
              researched, developed and deployed by an unincorporated joint
              venture of various persons and entities who collectively received
              approximately 30% of the total maximum supply of ASTRO (the “
              <strong>
                <i>Joint Venturers</i>
              </strong>
              ” and “
              <strong>
                <i>Joint Venture</i>
              </strong>
              ”). No representation, promise, guarantee or assurance is being
              made that any ASTRO retained by the Joint Venturers or any of
              their own respective funding or resources will be held, used or
              spent for the benefit of the Astroport community. Any sale or
              other transfer or distribution of ASTRO tokens by the Joint
              Venturers could occur without warning. Any such transaction would
              increase the circulating supply of ASTRO tokens. Depending on the
              number of ASTRO sold, transferred or distributed, the terms of
              sale, transfer or distribution and the prevailing market
              conditions, such a sale, transfer or other distribution could have
              a material adverse effect on the price or value of, or demand for,
              ASTRO tokens.
            </p>
            <p>
              Any use of ASTRO by the Joint Venturers could affect governance
              outcomes. No promise is being made by any Joint Venturer to
              participate or refrain from participating in Astroport governance,
              whether by voting ASTRO, xASTRO or vxASTRO or otherwise. No
              promise is being made that, if a Joint Venturer does participate
              in governance, that such Joint Venturer will vote in the best
              interest of ASTRO, xASTRO or vxASTRO holders or the Astroport
              community or observe any standard of care. Any Joint Venturer
              could have financial interests or other interests or incentives
              which could outweigh its interests and incentives (if any)
              relating to Astroport.
            </p>
            <p>
              Joint Venturers who hold ASTRO, xASTRO or vxASTRO and choose to
              participate in governance will be required to use their own
              personal independent discretion and decision-making in doing so.
              Neither the Joint Venture nor any of the Joint Venturers will
              direct, manage or control how each Joint Venturer participates in
              Astroport governance. As a result of the foregoing factors and the
              lack of any person or group of persons able to control and manage
              Astroport, any discretionary decision-making related to Astroport
              depends on the effectiveness of spontaneous group decision-making
              among participating ASTRO, xASTRO and vxASTRO holders. There may
              be disputes, differences of opinion, disagreements, conflicting
              incentives and a lack of extrinsic coordination among or between
              any or all of such persons, and such circumstances may adversely
              affect governance results and the value of ASTRO, xASTRO or
              vxASTRO or the use of the Astroport smart contracts.
            </p>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default DisclaimerContent;
