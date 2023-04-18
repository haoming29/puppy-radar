import NextLink from "next/link";
import { Box, Flex, Image, Link, Text, Tooltip } from "@chakra-ui/react";
import { shallow } from "zustand/shallow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import useStore from "@/store/useStore";

/**
 * The Nagivation bar for the website
 * @returns
 */
const Navigation = () => {
  const { authStatus, logout } = useStore(
    (state) => ({ authStatus: state.authStatus, logout: state.logout }),
    shallow
  );
  const router = useRouter();

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
            alt="website logo"
            height={"56px"}
            objectFit="cover"
          />
        </Link>
      </Flex>
      {authStatus >= 2 && (
        <Flex alignItems={"center"}>
          <Text
            cursor={"pointer"}
            fontSize="lg"
            mr={4}
            onClick={() => {
              logout();
              router.push("/");
            }}
          >
            Logout
          </Text>
          <Tooltip hasArrow label="Dogs You Liked">
            <Box
              fontSize="26px"
              h={"26px"}
              w={"26px"}
              cursor={"pointer"}
              onClick={() => router.push("/match")}
              title="Dogs You Liked"
            >
              <FontAwesomeIcon icon={faHeart} />
            </Box>
          </Tooltip>
        </Flex>
      )}
    </Flex>
  );
};

export default Navigation;
