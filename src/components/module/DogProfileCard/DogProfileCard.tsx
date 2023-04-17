import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import {
  faHeart,
  faLocationDot,
  faPaw,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface DogProfileCardProps {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
  liked: boolean;
  onToggleLike: () => void;
}

const DogProfileCard = (props: DogProfileCardProps) => {
  return (
    <Flex
      position={"relative"}
      w={"250px"}
      h={"300px"}
      bg={"gray.100"}
      borderRadius={"10px"}
      overflow={"hidden"}
      filter={
        props.liked
          ? "drop-shadow(0px 2px 12px rgba(190, 46, 0, 0.8))"
          : "drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.25))"
      }
      _hover={{
        filter: props.liked
          ? "drop-shadow(0px 2px 16px rgba(190, 46, 0, 0.8))"
          : "drop-shadow(0px 2px 16px rgba(0, 0, 0, 0.5))",
      }}
      transition={"filter 150ms ease-in-out"}
    >
      <Box
        position={"absolute"}
        top={"17px"}
        right={"15px"}
        w={"30px"}
        h={"30px"}
        color={props.liked ? "#E83333" : "gray.300"}
        transition={"color 150ms ease-in-out"}
        filter={"drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.4))"}
        zIndex={3}
        cursor={"pointer"}
        aria-label="Like this dog."
        onClick={props.onToggleLike}
      >
        <FontAwesomeIcon icon={faHeart} height={"30px"} />
      </Box>
      <Flex
        flexDir={"column"}
        justifyContent={"flex-end"}
        position={"absolute"}
        top={0}
        left={0}
        paddingX={"15px"}
        paddingY={"25px"}
        width={"100%"}
        height={"100%"}
        bg={
          "linear-gradient(180deg, rgba(0, 0, 0, 0) 45%, rgba(0, 0, 0, 0.9) 100%)"
        }
        color={"white"}
        borderRadius={"10px"}
        zIndex={2}
      >
        <Text fontWeight={"bold"} fontSize={"xl"} mb={1}>
          {props.name}
        </Text>
        <Flex mb={1}>
          <Text w={"50%"}>{props.age} YO</Text>
          <Flex alignItems={"center"}>
            <FontAwesomeIcon icon={faLocationDot} height={"16px"} />
            <Text ml={2}>{props.zip_code}</Text>
          </Flex>
        </Flex>
        <Flex alignItems={"center"}>
          <FontAwesomeIcon icon={faPaw} height={"16px"} />
          <Text ml={2}>{props.breed}</Text>
        </Flex>
      </Flex>
      <Image
        w={"250px"}
        h={"300px"}
        src={props.img}
        alt={`A dog named${props.name}.`}
        objectFit={"cover"}
        zIndex={1}
      />
    </Flex>
  );
};

export default DogProfileCard;
