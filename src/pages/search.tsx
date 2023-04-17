import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navigation from "@/components/module/Navigation/Navigation";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

import { DEFAULT_SSO_DESCRIPTION } from "@/configs";
import { getTitle } from "@/utilities";
import Head from "next/head";
import styles from "@/styles/Search.module.css";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { MultiSelect } from "react-multi-select-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import DogProfileCard from "@/components/module/DogProfileCard/DogProfileCard";
import Pagination from "@/components/element/Pagination/Pagination";

const options = [
  { label: "Grapes 🍇", value: "grapes" },
  { label: "Mango 🥭", value: "mango" },
  { label: "Strawberry 🍓", value: "strawberry", disabled: true },
];

const dogs = [
  {
    id: "Ababa8905009",
    img: "https://picsum.photos/seed/picsum/220/300",
    name: "Aabab Jkaodj",
    age: 18,
    zip_code: "53765",
    breed: "string",
  },
  {
    id: "Ababa120009",
    img: "https://picsum.photos/seed/picsum/200/300",
    name: "Aabab Jkaodj",
    age: 18,
    zip_code: "53765",
    breed: "string",
  },
  {
    id: "Ababa8210009",
    img: "https://picsum.photos/seed/picsum/200/300",
    name: "Aabab Jkaodj",
    age: 18,
    zip_code: "53765",
    breed: "string",
  },
  {
    id: "Ababa8910009",
    img: "https://picsum.photos/seed/picsum/200/300",
    name: "Aabab Jkaodj",
    age: 18,
    zip_code: "53765",
    breed: "string",
  },
  {
    id: "Ababa8900219",
    img: "https://picsum.photos/seed/picsum/200/300",
    name: "Aabab Jkaodj",
    age: 18,
    zip_code: "53765",
    breed: "string",
  },
  {
    id: "Ababa8900029",
    img: "https://picsum.photos/seed/picsum/200/300",
    name: "Aabab Jkaodj",
    age: 18,
    zip_code: "53765",
    breed: "string",
  },
  {
    id: "Ababa8930009",
    img: "https://picsum.photos/seed/picsum/200/300",
    name: "Aabab Jkaodj",
    age: 18,
    zip_code: "53765",
    breed: "string",
  },
];

const Search = () => {
  const emptyLike: Record<string, boolean> = {};
  const router = useRouter();

  const AGE_RANGE = [0, 20];
  const [selected, setSelected] = useState([]);
  const [displayRange, setDisplayRange] = useState(AGE_RANGE);
  const [dataRange, setDataRange] = useState(AGE_RANGE);
  const [ascendingSort, setAscendingSort] = useState(true);
  const [likedDogs, setLikedDogs] = useState(emptyLike); // This one needs refactor to store
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const page = router.query?.page;
    page && setPageNumber(Number(page));
  }, [router.query]);

  return (
    <>
      <Head>
        <title>{getTitle("Search")}</title>
        <meta name="description" content={DEFAULT_SSO_DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />
      <main className={styles.main}>
        <Heading mt={"50px"} fontSize={"5xl"} fontWeight={700}>
          Search
        </Heading>
        <Flex
          mt={"50px"}
          bg={"brand.light.100"}
          pl={"10px"}
          pr={"10px"}
          width={"800px"}
          h={"50px"}
          borderRadius={"10px"}
          alignItems={"center"}
        >
          <Flex alignItems={"center"} className={styles.inputItem}>
            <Text mr={2}>Breeds</Text>
            <MultiSelect
              className={styles.multiSelectBox}
              options={options}
              value={selected}
              onChange={setSelected}
              labelledBy="Select"
            />
          </Flex>
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            className={styles.inputItem}
          >
            <Tooltip label="Sort breeds in ascending order">
              <Box
                w={"18px"}
                lineHeight={"18px"}
                mr={2}
                onClick={() =>
                  !ascendingSort && setAscendingSort(!ascendingSort)
                }
              >
                <FontAwesomeIcon
                  icon={faArrowUp}
                  className={classNames(styles.arrow, {
                    [styles.activeArrow]: ascendingSort,
                  })}
                />
              </Box>
            </Tooltip>
            <Tooltip label="Sort breeds in descending order">
              <Box
                w={"18px"}
                lineHeight={"18px"}
                onClick={() =>
                  ascendingSort && setAscendingSort(!ascendingSort)
                }
              >
                <FontAwesomeIcon
                  icon={faArrowDown}
                  className={classNames(styles.arrow, {
                    [styles.activeArrow]: !ascendingSort,
                  })}
                />
              </Box>
            </Tooltip>
          </Flex>
          <Flex alignItems={"center"} w={"250px"} className={styles.inputItem}>
            <Text mr={4}>Age</Text>
            <RangeSlider
              defaultValue={displayRange}
              min={0}
              max={20}
              step={1}
              onChange={(val) => setDisplayRange(val)}
              onChangeEnd={(val) => {
                setDataRange(val);
                setDisplayRange(val);
              }}
            >
              <RangeSliderTrack bg={"brand.dark.100"}>
                <RangeSliderFilledTrack bg={"brand.dark.900"} />
              </RangeSliderTrack>
              <Tooltip label={"" + displayRange[0]}>
                <RangeSliderThumb
                  index={0}
                  aria-label={`Min at ${displayRange[0]}`}
                />
              </Tooltip>
              <Tooltip label={"" + displayRange[1]}>
                <RangeSliderThumb
                  index={1}
                  aria-label={`Max at ${displayRange[1]}`}
                />
              </Tooltip>
            </RangeSlider>
          </Flex>
        </Flex>
        <Grid
          templateColumns="repeat(4, 1fr)"
          gap={8}
          rowGap={12}
          mt={"80px"}
          mb={"80px"}
        >
          {dogs.map((item, idx) => (
            <GridItem key={idx}>
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
                  console.log(newLikedDogs);
                }}
              />
            </GridItem>
          ))}
        </Grid>
        <Pagination
          curPage={pageNumber}
          pageCount={100}
          onPageChange={(page) => {
            router.push({
              pathname: "/search",
              query: { page: page.selected + 1 },
            });
          }}
        />
      </main>
    </>
  );
};

export default Search;
