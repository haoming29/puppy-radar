import NextLink from "next/link";
import { Box, Flex, Image, Text, Tooltip, Link } from "@chakra-ui/react";
import { shallow } from "zustand/shallow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import useStore from "@/store/useStore";

function Navigation() {
  const { authStatus } = useStore(
    (state) => ({ authStatus: state.authStatus }),
    shallow
  );

  return (
    <Flex
      h={"60px"}
      backgroundColor="brand.light.900"
      pl={24}
      pr={24}
      justifyContent={"space-between"}
    >
      <Flex alignItems={"center"}>
        <Link as={NextLink} href="/">
          <Image
            src="/puppy-radar-logo.svg"
            alt="logo"
            height={"56px"}
            objectFit="cover"
          />
        </Link>
      </Flex>
      {authStatus >= 2 && (
        <Flex alignItems={"center"}>
          <Text fontSize="lg" mr={4}>
            Logout
          </Text>
          <Tooltip hasArrow label="Dogs You Liked">
            <Box fontSize="26px" h={"26px"} w={"26px"} cursor={"pointer"}>
              <FontAwesomeIcon icon={faHeart} />
            </Box>
          </Tooltip>
        </Flex>
      )}
    </Flex>
  );
}

export default Navigation;
