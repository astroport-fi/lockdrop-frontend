import React from 'react';
import { escapeRegExp } from '../../utils';
import styles from './NumericalInput.module.scss';

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`); // match escaped "." characters via in a non-capturing group

export const NumericalInput = React.memo(function InnerInput({
  value,
  onUserInput,
  placeholder,
  fontSize,
  color,
  fontWeight = 400,
  placeholderColor,
  align,
  ...rest
}: {
  value: string | number;
  onUserInput: (input: string) => void;
  error?: boolean;
  fontSize?: number;
  fontWeight?: string | number;
  placeholderColor?: string;
  align?: 'right' | 'left';
} & Omit<React.HTMLProps<HTMLInputElement>, 'ref' | 'onChange' | 'as'>) {
  const enforcer = (nextUserInput: string) => {
    if (nextUserInput === '' || inputRegex.test(escapeRegExp(nextUserInput))) {
      onUserInput(nextUserInput);
    }
  };

  return (
    <input
      {...rest}
      className={styles.numericalInput}
      value={value}
      onChange={(event) => {
        enforcer(event.target.value.replace(/,/g, '.'));
      }}
      inputMode="decimal"
      autoComplete="off"
      autoCorrect="off"
      type="text"
      pattern="^[0-9]*[.,]?[0-9]*$"
      placeholder={placeholder !== undefined ? placeholder : '0.0'}
      minLength={1}
      maxLength={79}
      spellCheck="false"
      style={{
        textAlign: align ?? 'right',
        fontSize: fontSize ?? 24,
        fontWeight
      }}
    />
  );
});

export default NumericalInput;
