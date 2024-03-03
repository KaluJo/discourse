import { extendTheme } from "@chakra-ui/react";

const Theme = extendTheme({
  // Customizing global styles
  styles: {
    global: {
      // Apply color property to body to change text color globally
      body: {
        color: "white",
      },
      heading: {
        color: "white",
      },
    },
  },
  // You can also customize components directly if needed
  components: {
    // Example: Customizing the Button component
    Button: {
      // You can define base styles or specific variants
      baseStyle: {
        _hover: {
          bg: "gray.600",
        },
      },
    },
  },
});

export default Theme;
