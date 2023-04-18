import { useEffect } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Image,
  Input,
  SimpleGrid,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { Flex, Heading, Text } from "@chakra-ui/layout";
import { ErrorMessage } from "@hookform/error-message";
import { shallow } from "zustand/shallow";
import { DEFAULT_SEO_DESCRIPTION, HOME_PAGE_TITLE } from "@/configs";
import { loginUser } from "@/services/http";
import { LoginUserRequest } from "@/types/api/User";
import { useRouter } from "next/router";
import Navigation from "@/components/module/Navigation/Navigation";
import styles from "@/styles/Home.module.css";
import useStore from "@/store/useStore";

interface LoginForm {
  firstName: string;
  lastName: string;
  email: string;
}

/**
 * The home page for the website
 * @returns
 */
const Home = () => {
  const router = useRouter();
  const { authStatus, setAuthStatus } = useStore(
    (state) => ({
      authStatus: state.authStatus,
      setAuthStatus: state.setAuthStatus,
    }),
    shallow
  );

  useEffect(() => {
    if (authStatus === 2) {
      router.push("/search");
    }
  }, [authStatus, router]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });
  const onSubmit = async (data: LoginForm) => {
    const apiData: LoginUserRequest = {
      name: data.firstName + " " + data.lastName,
      email: data.email,
    };
    try {
      setAuthStatus(1); // start logging-in
      const result = await loginUser(apiData);
      setAuthStatus(2);
      router.push({ pathname: "/search" });
    } catch (error) {
      setAuthStatus(0);
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>{HOME_PAGE_TITLE}</title>
        <meta name="description" content={DEFAULT_SEO_DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />
      <main className={styles.main}>
        <Flex h={"100%"} alignItems={"flex-end"} justifyContent={"center"}>
          <Image
            src="/images/puppy-alpha.png"
            alt="a puppy"
            w={"553px"}
            maxH={"569px"}
          ></Image>
          <Flex
            h={"100%"}
            flexDir={"column"}
            justifyContent={"center"}
            alignItems={"flex-start"}
          >
            <Box mb={16}>
              <Heading size="3xl" fontWeight={"bold"} lineHeight={"95px"}>
                🐕 Puppies
              </Heading>
              <Heading
                size="3xl"
                display={"inline-block"}
                fontWeight={"300"}
                mr={4}
              >
                To Be
              </Heading>
              <Heading size="3xl" display={"inline-block"} fontWeight={"bold"}>
                Saved
              </Heading>
              <Text fontSize={"4xl"} fontWeight={"bold"} mt={4}>
                Shelter Dog Match ❤️
              </Text>
            </Box>
            <Box>
              <Text fontSize={"xl"} fontWeight={"bold"}>
                Become a Hero Today
              </Text>
              <SimpleGrid columns={2} mt={4} mb={4} spacing={2}>
                <Controller
                  name="firstName"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "First name is a required filed.",
                    },
                    pattern: {
                      value: /^[a-zA-Z]+$/,
                      message:
                        "Your fisrt name may only contain alphabetic characters.",
                    },
                  }}
                  render={({ field }) => (
                    <FormControl>
                      <FormLabel>First Name</FormLabel>
                      <Input
                        variant={"filled"}
                        isInvalid={!!errors?.firstName}
                        {...field}
                      />
                    </FormControl>
                  )}
                />

                <Controller
                  name="lastName"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Last name is a required filed.",
                    },
                    pattern: {
                      value: /^[a-zA-Z]+$/,
                      message:
                        "Your last name may only contain alphabetic characters.",
                    },
                  }}
                  render={({ field }) => (
                    <FormControl>
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        variant={"filled"}
                        isInvalid={!!errors?.lastName}
                        {...field}
                      />
                    </FormControl>
                  )}
                />
              </SimpleGrid>
              <Flex alignItems={"flex-end"}>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Email is a required field.",
                    },
                    pattern: {
                      value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                      message: "Please enter a valid email address.",
                    },
                  }}
                  render={({ field }) => (
                    <FormControl>
                      <FormLabel>Email</FormLabel>
                      <Input
                        variant={"filled"}
                        type="email"
                        mr={2}
                        isInvalid={!!errors?.email}
                        {...field}
                      />
                    </FormControl>
                  )}
                />
                <Button
                  minW={"30%"}
                  bg={"brand.dark.900"}
                  color={"white"}
                  isLoading={authStatus === 1}
                  onClick={handleSubmit(onSubmit)}
                >
                  Get Started
                </Button>
              </Flex>
              {errors && (
                <Box mt={4}>
                  <ErrorMessage
                    errors={errors}
                    name="firstName"
                    render={({ message }) => <Text>{message}</Text>}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="lastName"
                    render={({ message }) => <Text>{message}</Text>}
                  />
                  <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({ message }) => <Text>{message}</Text>}
                  />
                </Box>
              )}
            </Box>
          </Flex>
        </Flex>
      </main>
    </>
  );
};

export default Home;
