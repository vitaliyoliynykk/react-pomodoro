import {
  Alert,
  Box,
  Button,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';

import { ACCESS_TOKEN_KEY } from '@/shared/constants/tokens';
import { useAuth } from '@/shared/context/auth-context';
import { SignInResponseModel } from '@/shared/models/responses/sign-in-response-model';
import api from '@/utils/api';

const SignInPage: FC = () => {
  const navigate = useNavigate();
  const { setUserToState } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<{
    email: string;
    password: string;
  }>({
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
      const response = await api.post<SignInResponseModel>('auth/login', {
        email,
        password,
      });

      if (response.data.accessToken && setUserToState) {
        localStorage.setItem(ACCESS_TOKEN_KEY, response.data.accessToken);
        setUserToState(response.data.accessToken);

        void navigate('/');
      }
    } catch {
      reset();
    }
  });

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg="rgb(36 36 36)"
    >
      <Box
        bg="white"
        p={6}
        m="0 1.5rem"
        borderRadius="lg"
        boxShadow="lg"
        width="400px"
        textAlign="center"
      >
        <Heading size="md" mb={4}>
          Sign In
        </Heading>

        <VStack>
          <Input
            type="email"
            placeholder="Email"
            color="black"
            {...register('email', {
              required: 'Email is required',
            })}
          />

          <Input
            type="password"
            placeholder="Password"
            color="black"
            {...register('password', {
              required: 'Password is required',
            })}
          />

          <Button
            colorScheme="blue"
            width="100%"
            type="submit"
            onClick={() => {
              void onSubmit();
            }}
            loading={isSubmitting}
            disabled={isSubmitting || !isValid}
          >
            Sign In
          </Button>
        </VStack>

        {errors.root && (
          <Alert.Root status="error" marginTop={2}>
            <Alert.Indicator />
            <Alert.Title>{errors.root.message}</Alert.Title>
          </Alert.Root>
        )}

        <Text mt={4} color="blue.500">
          <Link to="/register">Don&apos;t have an account? Register</Link>
        </Text>
      </Box>
    </Box>
  );
};

export default SignInPage;
