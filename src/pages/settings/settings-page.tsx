import { Heading } from '@chakra-ui/react';

import { Container } from './styled-components';

function SettingsPage() {
  // const dispatch = new useDispatch<AppDispatch>();

  // useEffect(() => {
  //   dispatch();
  // }, [dispatch]);
  return (
    <Container>
      <Heading>Timer</Heading>
      <div>
        {/* <Field
          label="Enter Number"
          helperText="Enter a number between 1 and 10"
        >
          <NumberInputRoot width="200px">
            <NumberInputField />
          </NumberInputRoot>
        </Field> */}
      </div>
    </Container>
  );
}

export default SettingsPage;
