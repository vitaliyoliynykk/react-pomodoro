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

const SignInPage: FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<{
    email: string;
    password: string;
  }>({
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = handleSubmit(() => {
    const user = localStorage.getItem('user');

    if (!user) {
      setError('root', {
        type: 'manual',
        message: 'There is no user found with this email!',
      });

      return;
    }

    void navigate('/');
    reset();
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
