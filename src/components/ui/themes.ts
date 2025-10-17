// theme.ts
import { extendTheme, ThemeConfig } from "@chakra-ui/react";

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
      // dark theme colors
      
      bgDark: "linear-gradient(180deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
      textDark: "#e0e0e0",
      accentDark: "#bb86fc",
    },
  },
  fonts: {
    heading: `'Poppins', sans-serif`, // pick your preferred font
    body: `'Poppins', sans-serif`,
  },
  styles: {
    global: (props: any) => ({

      "html, body": {
        bg:
          props.colorMode === "dark"
            ? "brand.bgDark"
            : "brand.bgLight",
        color:
          props.colorMode === "dark"
            ? "brand.textDark"
            : "brand.textLight",
        // transition: "background 5s ease-in-out, color 0.6s ease-in-out",
        // minHeight: "100vh"
      },
    }),
  },
});

export default theme;
