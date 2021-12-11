const button = {
  baseStyle: {
    fontWeight: "500",
    borderRadius: "full",
    height: "7",
    border: "1px",
  },
  variants: {
    primary: {
      outline: "none",
      fontSize: "sm",
      bg: "brand.purple",
      borderColor: "brand.purple",
      color: "white",
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
    secondary: {
      outline: "none",
      fontSize: "sm",
      borderColor: "rgba(255, 255, 255, 0.3)",
      bg: "rgba(255, 255, 255, 0.2)",
      color: "white",
      px: "6",
      py: "2",
      _hover: {
        bg: "white",
        borderColor: "white",
        color: "brand.dark",
        _disabled: {
          bg: "rgba(255, 255, 255, 0.2)",
          borderColor: "rgba(255, 255, 255, 0.3)",
          color: "white",
        },
      },
      _active: {
        bg: "white",
        color: "brand.dark",
      },
      _focus: {
        boxShadow: "none",
      },
    },
    mini: {
      outline: "none",
      borderRadius: "md",
      color: "white.600",
      bg: "white.100",
      px: "2",
      h: "auto",
      py: "0.5",
      fontSize: "11px",
      border: "none",
      letterSpacing: "widest",
      textTransform: "uppercase",
      fontWeight: "bold",
      _hover: {
        bg: "brand.purple",
        color: "white",
      },
      _focus: {
        boxShadow: "none",
      },
      _active: {
        bg: "brand.purple",
        color: "white",
      },
    },
    filter: {
      outline: "none",
      color: "white.600",
      bg: "white.100",
      fontSize: "0.65rem",
      borderRadius: "sm",
      minWidht: "16",
      py: "1",
      px: "2.5",
      height: "auto",
      letterSpacing: "0.15rem",
      textTransform: "uppercase",
      fontWeight: "bold",
      _hover: {
        bg: "brand.purple",
        color: "white",
      },
      _focus: {
        boxShadow: "none",
      },
      _active: {
        bg: "brand.purple",
        color: "white",
      },
    },
    sliderPercent: {
      border: "0",
      alignItems: "flex-start",
      color: "white",
      opacity: "0.4",
      p: "0",
      minW: "0",
      _hover: {
        opacity: "0.6",
      },
      _focus: {
        boxShadow: "none",
      },
    },
    icon: {
      bg: "transparent",
      outline: "none",
      border: "0",
      px: "0",
      _hover: {
        color: "brand.purple",
        bg: "transparent",
      },
      _active: {
        color: "brand.purple",
        bg: "transparent",
      },
      _focus: {
        boxShadow: "none",
      },
      color: "transparent",
    },
    simple: {
      outline: "none",
      borderRadius: "none",
      bg: "none",
      px: "none",
      color: "white.400",
      fontWeight: "400",
      fontSize: "lg",
      _hover: {
        color: "white",
      },
      _active: {
        color: "white",
      },
      _focus: {
        boxShadow: "none",
      },
    },
  },
};

export default button;
