import React, { useEffect, useState } from "react";
import { Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import Navigation from "@/components/module/Navigation/Navigation";
import { DEFAULT_SSO_DESCRIPTION } from "@/configs";
import { getTitle } from "@/utilities";
import { Dog } from "@/types/general/Dog";
import { getDogsDetail } from "@/services/http";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPaw } from "@fortawesome/free-solid-svg-icons";
import { shallow } from "zustand/shallow";
import useStore from "@/store/useStore";
import Head from "next/head";
import styles from "@/styles/MatchResult.module.css";

const MatchResult = () => {
  const router = useRouter();

  const [matchedDogDetail, setMatchedDogDetail] = useState<Dog | undefined>();
  const { clearLikedDogs } = useStore(
    (state) => ({
      clearLikedDogs: state.clearLikedDogs,
    }),
    shallow
  );

  useEffect(() => {
    if (!router.query || !router.query.id) {
      router.push("/search");
      return;
    }
    getDogsDetail([router.query.id as string])
      .then((dog) => {
        setMatchedDogDetail(dog[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [router, router.query]);

  return (
    <>
      <Head>
        <title>{getTitle("Match Result")}</title>
        <meta name="description" content={DEFAULT_SSO_DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <main className={styles.main}>
        <Flex
          flexDir={"column"}
          alignItems={"center"}
          width={"500px"}
          paddingX={24}
          mt={"80px"}
          mb={"40px"}
        >
          <Heading fontSize={"60px"}>🎉</Heading>
          <Heading mt={6}>Congratulations!</Heading>
          <Heading mt={6} fontSize={"2xl"}>
            Your Matched Puppy
          </Heading>
          <Image
            mt={6}
            src={matchedDogDetail?.img}
            alt="Dog"
            w={"260px"}
            h={"300px"}
            objectFit={"cover"}
            borderRadius={"10px"}
            filter={"drop-shadow(0px 2px 12px rgba(190, 46, 0, 0.8))"}
            _hover={{
              filter: "drop-shadow(0px 2px 16px rgba(190, 46, 0, 0.8))",
            }}
          ></Image>
          <Heading mt={8}>{matchedDogDetail?.name}</Heading>
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            width={"100%"}
            mt={4}
          >
            <Flex alignItems={"center"}>
              <FontAwesomeIcon icon={faPaw} height={"16px"} />
              <Text fontSize={"xl"} ml={2}>
                {matchedDogDetail?.breed}
              </Text>
            </Flex>
            <Text fontSize={"xl"}>{`${matchedDogDetail?.age} YO`}</Text>
            <Flex alignItems={"center"}>
              <FontAwesomeIcon icon={faLocationDot} height={"16px"} />
              <Text fontSize={"xl"} ml={2}>
                {matchedDogDetail?.zip_code}
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Button
          ml={4}
          mb={"40px"}
          size={"lg"}
          bg={"brand.dark.900"}
          color={"white"}
          onClick={() => {
            clearLikedDogs();
            router.replace("/search");
          }}
        >
          Start Over
        </Button>
      </main>
    </>
  );
};

export default MatchResult;
