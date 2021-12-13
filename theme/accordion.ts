const variants = {
  primary: {
    button: {
      outline: "none",
      fontSize: "sm",
      bg: "brand.purple",
      borderColor: "brand.purple",
      color: "white",
      display: "inline",
      width: "auto",
      fontWeight: "500",
      borderRadius: "full",
      height: "9",
      px: "6",
      py: "2",
      _hover: {
        bg: "white",
        borderColor: "white",
        color: "brand.purple",
        _disabled: {
          bg: "brand.purple",
          borderColor: "brand.purple",
          color: "white",
        },
      },
      _focus: {
        boxShadow: "none",
      },
    },
  },
};

const style = {
  variants,
};

export default style;
