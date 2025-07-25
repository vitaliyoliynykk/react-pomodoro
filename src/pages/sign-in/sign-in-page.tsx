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
import { signIn } from '@/store/slices/user-slice';
import { useAppDispatch } from '@/store/store';

const SignInPage: FC = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const dispatch = useAppDispatch();

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

  const onSubmit = handleSubmit(({ email, password }) => {
    dispatch(signIn({ email, password }))
      .unwrap()
      .then(({ accessToken }) => {
        if (accessToken && setUser) {
          localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
          setUser(accessToken);

          void navigate('/');
        }
      })
      .catch(() => {
        reset();
      });
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
        <Heading size="4xl" mb={4} color="black">
          Flow Track
        </Heading>

        <VStack>
          <Input
            type="email"
            placeholder="Email"
            variant="subtle"
            size="lg"
            {...register('email', {
              required: 'Email is required',
            })}
          />

          <Input
            type="password"
            placeholder="Password"
            variant="subtle"
            size="lg"
            {...register('password', {
              required: 'Password is required',
            })}
          />

          <Button
            width="100%"
            type="submit"
            colorPalette={'teal'}
            size="lg"
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
