import { useEffect } from "react";
import Head from "next/head";
import { useForm, Controller } from "react-hook-form";
import { Flex, Heading, Text } from "@chakra-ui/layout";
import { Box, Button, Image, Input, SimpleGrid } from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";
import { shallow } from "zustand/shallow";

import Navigation from "@/components/module/Navigation/Navigation";
import styles from "@/styles/Home.module.css";
import { loginUser } from "@/services/http";
import { LoginUserData } from "@/types/api/User";
import { HOME_PAGE_TITLE, DEFAULT_SSO_DESCRIPTION } from "@/configs";
import useStore from "@/store/useStore";

interface LoginForm {
  firstName: string;
  lastName: string;
  email: string;
}

const Home = () => {
  const { authStatus, setAuthStatus } = useStore(
    (state) => ({
      authStatus: state.authStatus,
      setAuthStatus: state.setAuthStatus,
    }),
    shallow
  );

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
    const apiData: LoginUserData = {
      name: data.firstName + " " + data.lastName,
      email: data.email,
    };
    try {
      setAuthStatus(1); // start logging-in
      const result = await loginUser(apiData);
      setAuthStatus(2);
      console.log(result);
    } catch (error) {
      setAuthStatus(0);
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>{HOME_PAGE_TITLE}</title>
        <meta name="description" content={DEFAULT_SSO_DESCRIPTION} />
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
                    <Input
                      variant={"filled"}
                      placeholder="First Name"
                      isInvalid={!!errors?.firstName}
                      {...field}
                    />
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
                    <Input
                      variant={"filled"}
                      placeholder="Last Name"
                      isInvalid={!!errors?.lastName}
                      {...field}
                    />
                  )}
                />
              </SimpleGrid>
              <Flex>
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
                    <Input
                      variant={"filled"}
                      placeholder="Email"
                      type="email"
                      mr={2}
                      isInvalid={!!errors?.email}
                      {...field}
                    />
                  )}
                />
                <Button
                  minW={"30%"}
                  bg={"brand.dark.800"}
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
