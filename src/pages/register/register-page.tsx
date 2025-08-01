import { Box, Button, Heading, Input, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';

import { toaster } from '@/components/ui/toaster';
import { registerUser } from '@/store/slices/user-slice';
import { useAppDispatch } from '@/store/store';

const RegisterPage: FC = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset } = useForm<{
    email: string;
    password: string;
  }>({
    defaultValues: { email: '', password: '' },
  });

  const navigate = useNavigate();

  const onSubmit = handleSubmit(({ email, password }) => {
    dispatch(registerUser({ email, password }))
      .unwrap()
      .then(() => {
        toaster.create({
          type: 'success',
          description: 'User created. You can sign in',
          duration: 3000,
        });
        void navigate('/sign-in');
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
            colorScheme="blue"
            width="100%"
            type="submit"
            size="lg"
            colorPalette={'teal'}
            onClick={() => {
              void onSubmit();
            }}
          >
            Register
          </Button>
        </VStack>

        <Text mt={4} color="blue.500">
          <Link to="/sign-in">Already have an account? Sign In</Link>
        </Text>
      </Box>
    </Box>
  );
};

export default RegisterPage;
