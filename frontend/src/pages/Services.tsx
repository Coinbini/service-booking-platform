import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Image,
  Text,
  Badge,
  Button,
  VStack,
  HStack,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Service } from '../types'

// Mock data - replace with API call later
const mockServices: Service[] = [
  {
    id: '1',
    name: 'House Cleaning',
    category: 'Home Services',
    description: 'Professional house cleaning service',
    price: 80,
    duration: 3,
    image: 'https://via.placeholder.com/300',
  },
  {
    id: '2',
    name: 'Haircut & Styling',
    category: 'Personal Care',
    description: 'Professional haircut and styling',
    price: 50,
    duration: 1,
    image: 'https://via.placeholder.com/300',
  },
  {
    id: '3',
    name: 'Plumbing Repair',
    category: 'Maintenance',
    description: 'Professional plumbing services',
    price: 100,
    duration: 2,
    image: 'https://via.placeholder.com/300',
  },
  {
    id: '4',
    name: 'Car Wash',
    category: 'Vehicle Services',
    description: 'Professional car washing service',
    price: 30,
    duration: 1,
    image: 'https://via.placeholder.com/300',
  },
]

const Services = () => {
  const [services] = useState<Service[]>(mockServices)
  const toast = useToast()

  const handleBooking = (service: Service) => {
    toast({
      title: 'Booking Initiated',
      description: `You're about to book ${service.name}`,
      status: 'info',
      duration: 3000,
      isClosable: true,
    })
    // Add booking logic here
  }

  return (
    <Container maxW="container.xl" py={10}>
      <Heading mb={8}>Available Services</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
        {services.map((service) => (
          <Box
            key={service.id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
          >
            <Image src={service.image} alt={service.name} />
            <Box p={6}>
              <HStack spacing={2} mb={2}>
                <Badge colorScheme="blue">{service.category}</Badge>
                <Badge colorScheme="green">
                  ${service.price}/hr
                </Badge>
              </HStack>
              <VStack align="start" spacing={2}>
                <Heading size="md">{service.name}</Heading>
                <Text color="gray.600">{service.description}</Text>
                <Text>Duration: {service.duration} hour(s)</Text>
                <Button
                  colorScheme="blue"
                  width="full"
                  onClick={() => handleBooking(service)}
                >
                  Book Now
                </Button>
              </VStack>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  )
}

export default Services
