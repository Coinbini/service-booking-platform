import {
  Box,
  Container,
  Heading,
  VStack,
  HStack,
  Text,
  Badge,
  Button,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Booking } from '../types'

// Mock data - replace with API call later
const mockBookings: Booking[] = [
  {
    id: '1',
    serviceId: '1',
    providerId: 'p1',
    userId: 'u1',
    date: '2025-01-15T10:00:00',
    status: 'confirmed',
  },
  {
    id: '2',
    serviceId: '2',
    providerId: 'p2',
    userId: 'u1',
    date: '2025-01-20T14:00:00',
    status: 'pending',
  },
]

const Bookings = () => {
  const [bookings] = useState<Booking[]>(mockBookings)
  const toast = useToast()

  const handleCancelBooking = (bookingId: string) => {
    toast({
      title: 'Booking Cancelled',
      description: 'Your booking has been cancelled',
      status: 'info',
      duration: 3000,
      isClosable: true,
    })
    // Add cancellation logic here
  }

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return 'green'
      case 'pending':
        return 'yellow'
      case 'completed':
        return 'blue'
      case 'cancelled':
        return 'red'
      default:
        return 'gray'
    }
  }

  return (
    <Container maxW="container.xl" py={10}>
      <Heading mb={8}>My Bookings</Heading>
      <VStack spacing={4} align="stretch">
        {bookings.map((booking) => (
          <Box
            key={booking.id}
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="lg"
          >
            <HStack justify="space-between">
              <VStack align="start" spacing={2}>
                <Heading size="md">Booking #{booking.id}</Heading>
                <Text color="gray.600">
                  Date: {new Date(booking.date).toLocaleString()}
                </Text>
                <Badge colorScheme={getStatusColor(booking.status)}>
                  {booking.status.toUpperCase()}
                </Badge>
              </VStack>
              {booking.status !== 'cancelled' && (
                <Button
                  colorScheme="red"
                  variant="outline"
                  onClick={() => handleCancelBooking(booking.id)}
                >
                  Cancel Booking
                </Button>
              )}
            </HStack>
          </Box>
        ))}
      </VStack>
    </Container>
  )
}

export default Bookings
