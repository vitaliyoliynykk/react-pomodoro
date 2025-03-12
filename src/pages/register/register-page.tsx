import { Box, Button, Heading, Input, Text, VStack } from '@chakra-ui/react';
import { FC, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router';

const RegisterPage: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    localStorage.setItem('user', JSON.stringify({ email, password }));

    void navigate('/sign-in');
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
          Register
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
              Register
            </Button>
          </VStack>
        </form>

        <Text mt={4} color="blue.500">
          <Link to="/sign-in">Already have an account? Sign In</Link>
        </Text>
      </Box>
    </Box>
  );
};

export default RegisterPage;
