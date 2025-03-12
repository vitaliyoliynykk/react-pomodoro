import {
  Alert,
  Box,
  Button,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FC, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router';

const SignInPage: FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const user = localStorage.getItem('user');

    if (user) {
      setError(null);

      void navigate('/');
    } else {
      setError('There is no user found with this email!');
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bg="gray.100"
    >
      <Box
        bg="white"
        p={6}
        borderRadius="lg"
        boxShadow="lg"
        width="400px"
        textAlign="center"
      >
        <Heading size="md" mb={4}>
          Sign In
        </Heading>

        <form onSubmit={handleSubmit}>
          <VStack>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              color="black"
              required
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              color="black"
              required
            />

            <Button colorScheme="blue" width="100%" type="submit">
              Sign In
            </Button>
          </VStack>
        </form>

        {error && (
          <Alert.Root status="error" marginTop={2}>
            <Alert.Indicator />
            <Alert.Title>{error}</Alert.Title>
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
