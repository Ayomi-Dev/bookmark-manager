import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { StyleFunctionProps } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      secBg: "#fafbfb",
      bgLight: "#e8f1f0",
      textLight: "#323232",
      accentLight: "#e9d4ff",
     
      
      bgDark: "linear-gradient(to left, #0f2027 0%, #203a43 50%, #2c5364 100%)",
      textDark: "#e0e0e0",
      accentDark: "#bb86fc",
    },
  },
  fonts: {
    heading: `'Poppins', sans-serif`, 
    body: `'Poppins', sans-serif`,
  },
  styles: {
    global: (props: StyleFunctionProps) => ({

      "html, body": {
        bg:
          props.colorMode === "dark"
            ? "brand.bgDark"
            : "brand.bgLight",
        color:
          props.colorMode === "dark"
            ? "brand.textDark"
            : "brand.textLight",
        
      },
    }),
  },
  components: {
  Button: {
    variants: {
      brand: (props: StyleFunctionProps) => ({
        bg: props.colorMode === "dark" ? "black" : "brand.bgDark",
        color: "white",
        _hover: { bg: "gray.700" },
        transition: "background 0.4s ease",
        borderRadius: "md"
      }),
    },
    defaultProps: {
      variant: "brand", // all buttons use this by default
    },
  },
  Input: {
    variants: {
      borderless: {
        outline: {
          field: {
            _focus: {
              border: "none",
              boxShadow: "none"
            },
          },
        },
      }
    },
    defaultProps: {
      variant: "borderless", // all inputs use this
    },
  },
  
},

});

export default theme;
