import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { almostBlack, buttonGrey, gold, white95 } from '../theme/mui-theme';

export type Props = {
  label: string;
  height?: string | number;
  width?: string | number;
  disabled?: true | false;
  fullWidth?: true | false;
  fontSize?: string;
  lineHeight?: string;
  padding?: string;
  color?: string;
  hoverColor?: string;
  backgroundColor?: string;
  backgroundHoverColor?: string;
  type?: 'button' | 'reset' | 'submit' | undefined;
  style?: {};
  onClick?: () => void;
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    border: 'none',
    textTransform: 'none'
  },
  disabled: {
    boxShadow: 'none',
    backgroundColor: 'red'
  }
}));

const ApolloButton = ({
  label,
  disabled,
  fullWidth = false,
  height = '3rem',
  width = fullWidth ? '' : 'auto',
  fontSize = '13px',
  lineHeight = '20px',
  padding = '10px 30px 12px 30px',
  style,
  color = white95,
  backgroundColor = buttonGrey,
  hoverColor = almostBlack,
  backgroundHoverColor = gold,
  onClick,
  type = undefined
}: Props) => {
  const classes = useStyles();
  return (
    <Button
      disabled={disabled}
      classes={classes}
      size="large"
      fullWidth={fullWidth}
      onClick={onClick}
      type={type}
      sx={{
        borderRadius: 11,
        textTransform: 'none',
        fontWeight: 600,
        height: height,
        width: width,
        fontSize: fontSize,
        lineHeight: lineHeight,
        padding: padding,
        color: color,
        backgroundColor: backgroundColor,
        '&:hover': {
          backgroundColor: backgroundHoverColor,
          color: hoverColor
        },
        ...style
      }}>
      {label}
    </Button>
  );
};

export default ApolloButton;
