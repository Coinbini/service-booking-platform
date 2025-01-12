import { Box, Flex, Button, Heading, useColorMode } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FaSun, FaMoon } from 'react-icons/fa'

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box px={4} shadow="md">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Link to="/">
          <Heading size="md">Service Booking</Heading>
        </Link>

        <Flex alignItems="center" gap={4}>
          <Link to="/services">
            <Button variant="ghost">Services</Button>
          </Link>
          <Link to="/bookings">
            <Button variant="ghost">My Bookings</Button>
          </Link>
          <Link to="/profile">
            <Button variant="ghost">Profile</Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? <FaMoon /> : <FaSun />}
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Navbar
