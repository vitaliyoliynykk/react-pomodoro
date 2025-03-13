import { Box, Button, Heading, Input, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';

const RegisterPage: FC = () => {
  const { register, handleSubmit, reset } = useForm<{
    email: string;
    password: string;
  }>({
    defaultValues: { email: '', password: '' },
  });

  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    const { email, password } = data;

    localStorage.setItem('user', JSON.stringify({ email, password }));

    void navigate('/sign-in');
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
          Register
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
