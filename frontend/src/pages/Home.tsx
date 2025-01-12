import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Icon,
  VStack,
  Button,
} from '@chakra-ui/react'
import { FaHome, FaCut, FaTools, FaCar } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const features = [
  {
    icon: FaHome,
    title: 'Home Services',
    description: 'Cleaning, Plumbing, Electrical work, and more',
  },
  {
    icon: FaCut,
    title: 'Personal Care',
    description: 'Haircuts, Manicures, Massage, and Spa services',
  },
  {
    icon: FaTools,
    title: 'Maintenance',
    description: 'Appliance repair, Painting, Carpentry work',
  },
  {
    icon: FaCar,
    title: 'Vehicle Services',
    description: 'Car wash, Oil change, Basic maintenance',
  },
]

const Home = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} textAlign="center" mb={10}>
        <Heading size="2xl">Book Professional Services</Heading>
        <Text fontSize="xl" color="gray.500">
          Find and book trusted professionals for all your home needs
        </Text>
        <Link to="/services">
          <Button size="lg" colorScheme="blue">
            Explore Services
          </Button>
        </Link>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
        {features.map((feature, index) => (
          <Box
            key={index}
            p={6}
            shadow="md"
            borderWidth="1px"
            borderRadius="lg"
            textAlign="center"
          >
            <Icon as={feature.icon} w={10} h={10} color="blue.500" mb={4} />
            <Heading size="md" mb={2}>
              {feature.title}
            </Heading>
            <Text color="gray.600">{feature.description}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  )
}

export default Home
