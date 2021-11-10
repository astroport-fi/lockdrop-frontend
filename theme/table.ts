import { mode } from "@chakra-ui/theme-tools";

type Dict = Record<string, any>;

const numericStyles = {
  "&[data-is-numeric=true]": {
    textAlign: "end",
  },
};

const simpleVariant = (props: Dict) => {
  return {
    th: {
      color: "white.600",
      whiteSpace: "nowrap",
      fontSize: "11px",
      fontWeight: "500",
      textTransform: "none",
      ...numericStyles,
    },
    tbody: {
      tr: {
        py: "6",
        border: "none",
      },
    },
    td: {
      fontSize: "13px",
      ...numericStyles,
    },
    caption: {
      color: mode(`gray.600`, `gray.100`)(props),
    },
    tfoot: {
      tr: {
        "&:last-of-type": {
          th: { borderBottomWidth: 0 },
        },
      },
    },
  };
};

const table = {
  baseStyle: {
    table: {
      color: "white",
    },
  },
  variants: {
    simple: simpleVariant,
  },
};

export default table;
