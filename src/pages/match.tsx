import React, { useEffect, useState } from "react";
import { Button, Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import { getDogsDetail, matchDog } from "@/services/http";
import { DEFAULT_SSO_DESCRIPTION } from "@/configs";
import { useRouter } from "next/router";
import { getTitle } from "@/utilities";
import { Dog } from "@/types/general/Dog";
import Head from "next/head";
import styles from "@/styles/Match.module.css";
import Navigation from "@/components/module/Navigation/Navigation";
import useStore from "@/store/useStore";
import DogProfileCard from "@/components/module/DogProfileCard/DogProfileCard";

const Match = () => {
  const router = useRouter();

  const [likedDogsDetail, setLikedDogsDetail] = useState<Dog[]>([]);
  const [isMatching, setIsMatching] = useState(false);
  const likedDogs = useStore((state) => state.likedDogs);
  const setLikedDogs = useStore((state) => state.setLikedDogs);

  useEffect(() => {
    if (!likedDogs) return;
    getDogsDetail(Object.keys(likedDogs))
      .then((dogs) => {
        setLikedDogsDetail(dogs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [likedDogs]);

  const onMatch = async () => {
    setIsMatching(true);
    try {
      const match = await matchDog(Object.keys(likedDogs));
      router.push("/matchResult/?id=" + match.match);
    } catch (error) {
      console.log(error);
      setIsMatching(false);
    }
  };

  return (
    <>
      <Head>
        <title>{getTitle("Match")}</title>
        <meta name="description" content={DEFAULT_SSO_DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
      <main className={styles.main}>
        <Flex
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"100%"}
          paddingX={24}
          mt={"80px"}
        >
          <Heading fontSize={"3xl"}>Dogs You Liked</Heading>
          <Button
            ml={4}
            size={"lg"}
            bg={"brand.dark.900"}
            color={"white"}
            onClick={onMatch}
            isLoading={isMatching}
          >
            Find Match
          </Button>
        </Flex>
        <Grid
          templateColumns="repeat(4, 1fr)"
          gap={20}
          rowGap={12}
          mt={"80px"}
          mb={"80px"}
        >
          {likedDogsDetail.length > 0 &&
            likedDogsDetail.map((item: Dog) => (
              <GridItem key={item.id}>
                <DogProfileCard
                  {...item}
                  liked={!!likedDogs[item.id]}
                  onToggleLike={() => {
                    const newLikedDogs = { ...likedDogs };
                    if (likedDogs[item.id]) {
                      delete newLikedDogs[item.id];
                    } else {
                      newLikedDogs[item.id] = true;
                    }
                    setLikedDogs(newLikedDogs);
                  }}
                />
              </GridItem>
            ))}
        </Grid>
      </main>
    </>
  );
};

export default Match;
