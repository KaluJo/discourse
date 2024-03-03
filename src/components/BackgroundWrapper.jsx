import { Box, Flex } from "@chakra-ui/react";
import Header from "./Header";

function BackgroundWrapper(props) {
  return (
    <Box
      height="100vh" // Sets the height to full viewport height
      width="100vw" // Sets the width to full viewport width
      backgroundImage="/assets/bg-grad.png" // Set the URL of your background image
      backgroundPosition="center" // Centers the background image
      backgroundRepeat="no-repeat" // Prevents the background image from repeating
      backgroundSize="cover" // Ensures the background covers the entire Box
    >
      <Flex direction="column" height="100vh" alignItems="center">
        <Header />
        {props.children}
      </Flex>
    </Box>
  );
}

export default BackgroundWrapper;
