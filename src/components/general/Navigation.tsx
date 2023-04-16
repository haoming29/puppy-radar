import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldDog } from "@fortawesome/free-solid-svg-icons";

function Navigation() {
  return (
    <Box h={"60px"} backgroundColor="brand.light.900" pl={24} pr={24}>
      <Flex alignItems={"center"}>
        <Image
          src="/puppy-radar-logo.svg"
          alt="logo"
          height={"56px"}
          objectFit="cover"
        />
      </Flex>
    </Box>
  );
}

export default Navigation;
