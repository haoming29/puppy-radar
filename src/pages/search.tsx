import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navigation from "@/components/module/Navigation/Navigation";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

import { DEFAULT_PAGE_SIZE, DEFAULT_SSO_DESCRIPTION } from "@/configs";
import { getTitle } from "@/utilities";
import Head from "next/head";
import styles from "@/styles/Search.module.css";
import {
  Box,
  Button,
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
import { MultiSelect, Option } from "react-multi-select-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import DogProfileCard from "@/components/module/DogProfileCard/DogProfileCard";
import Pagination from "@/components/element/Pagination/Pagination";
import { getDogsBreeds, getDogsDetail, searchDogs } from "@/services/http";
import { SORTING, SearchDogResponse } from "@/types/api/Dog";
import { Dog } from "@/types/general/Dog";
import useStore from "@/store/useStore";
import { shallow } from "zustand/shallow";

const AGE_RANGE = [0, 20];

const Search = () => {
  const router = useRouter();
  const { likedDogs, setLikedDogs } = useStore(
    (state) => ({
      likedDogs: state.likedDogs,
      setLikedDogs: state.setLikedDogs,
    }),
    shallow
  );
  const [selected, setSelected] = useState<string[]>([]);
  const [displayRange, setDisplayRange] = useState(AGE_RANGE);
  const [ascendingSort, setAscendingSort] = useState(true);
  const [breedOptions, setBreedOptions] = useState<Option[]>([]);
  const [dogsPage, setDogsPage] = useState<SearchDogResponse>();
  const [dogsDetail, setDogsDetail] = useState<Dog[]>([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (!router.isReady || !router.query) return;
    const { page, sort, breeds, ageMin, ageMax } = router.query;

    if (breeds) {
      if (typeof breeds === "string") {
        setSelected([breeds]);
      } else {
        setSelected(breeds);
      }
    } else {
      setSelected([]);
    }

    const sortQuery = sort ? `breed:${sort}` : "";
    const searchAgeMin = ageMin ? Number(ageMin) : AGE_RANGE[0];
    const searchAgeMax = ageMax ? Number(ageMax) : AGE_RANGE[1];
    page && setPageNumber(Number(page));
    const from: number = page ? DEFAULT_PAGE_SIZE * (Number(page) - 1) : 0;
    sort && setAscendingSort(sort === SORTING.asc ? true : false);
    setDisplayRange([searchAgeMin, searchAgeMax]);
    searchDogs({
      from,
      sort: sortQuery,
      ageMin: searchAgeMin,
      ageMax: searchAgeMax,
      breeds: breeds as string[],
    }).then((dogs) => {
      setDogsPage(dogs);
    });
  }, [router, router.isReady, router.query]);

  useEffect(() => {
    Promise.all([getDogsBreeds(), searchDogs({})])
      .then((values) => {
        const breeds = values[0];
        const options: Option[] = breeds.map((item) => ({
          label: item,
          value: item,
        }));

        setBreedOptions(options);
        setDogsPage(values[1]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (!dogsPage?.resultIds) {
      return;
    }
    getDogsDetail(dogsPage.resultIds)
      .then((dogs) => {
        setDogsDetail(dogs);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dogsPage]);

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
        <Flex alignItems={"center"} mt={"50px"}>
          <Flex
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
                options={breedOptions}
                value={selected.map((item) => ({ label: item, value: item }))}
                onChange={(options: Option[]) => {
                  const oldeQuery = JSON.parse(JSON.stringify(router.query));
                  if (oldeQuery.breeds) {
                    delete oldeQuery.breeds;
                  }
                  router.push({
                    pathname: "/search",
                    query: {
                      ...oldeQuery,
                      breeds: options.map((item) => item.value),
                      page: 1,
                    },
                  });
                }}
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
                  onClick={() => {
                    if (ascendingSort) return;
                    router.push({
                      pathname: "/search",
                      query: { ...router.query, sort: SORTING.asc, page: 1 },
                    });
                  }}
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
                  onClick={() => {
                    if (!ascendingSort) return;
                    router.push({
                      pathname: "/search",
                      query: { ...router.query, sort: SORTING.desc, page: 1 },
                    });
                  }}
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
            <Flex
              alignItems={"center"}
              w={"250px"}
              className={styles.inputItem}
            >
              <Text mr={4}>Age</Text>
              <RangeSlider
                defaultValue={AGE_RANGE}
                value={displayRange}
                min={AGE_RANGE[0]}
                max={AGE_RANGE[1]}
                step={1}
                onChange={(val) => setDisplayRange(val)}
                onChangeEnd={(val) => {
                  setDisplayRange(val);
                  router.push({
                    pathname: "/search",
                    query: {
                      ...router.query,
                      ageMin: val[0] > AGE_RANGE[0] ? val[0] : AGE_RANGE[0],
                      ageMax: val[1] < AGE_RANGE[1] ? val[1] : AGE_RANGE[1],
                      page: 1,
                    },
                  });
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
          <Button
            ml={4}
            size={"lg"}
            bg={"brand.dark.900"}
            color={"white"}
            hidden={Object.keys(likedDogs).length <= 0}
            onClick={() => {
              router.push("/match");
            }}
          >
            Start Match
          </Button>
        </Flex>
        <Grid
          templateColumns="repeat(4, 1fr)"
          gap={8}
          rowGap={12}
          mt={"80px"}
          mb={"80px"}
        >
          {dogsDetail.length > 0 &&
            dogsDetail.map((item: Dog) => (
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
                    console.log(newLikedDogs);
                  }}
                />
              </GridItem>
            ))}
        </Grid>
        {dogsPage && dogsPage.total > DEFAULT_PAGE_SIZE && (
          <Pagination
            curPage={pageNumber}
            pageCount={
              dogsPage?.total
                ? Math.ceil(dogsPage?.total / DEFAULT_PAGE_SIZE)
                : 0
            }
            onPageChange={(page) => {
              router.push({
                pathname: "/search",
                query: { ...router.query, page: page.selected + 1 },
              });
            }}
          />
        )}
      </main>
    </>
  );
};

export default Search;
