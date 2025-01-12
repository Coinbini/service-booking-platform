import {
  Container,
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Avatar,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'

interface UserProfile {
  name: string
  email: string
  phone: string
  address: string
}

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 890',
    address: '123 Main St, City, Country',
  })
  const toast = useToast()

  const handleSave = () => {
    setIsEditing(false)
    toast({
      title: 'Profile Updated',
      description: 'Your profile has been successfully updated',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
    // Add API call to save profile here
  }

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8}>
        <Avatar size="2xl" name={profile.name} />
        <Heading>My Profile</Heading>

        <Box w="100%" p={8} borderWidth="1px" borderRadius="lg">
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                value={profile.name}
                isReadOnly={!isEditing}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                value={profile.email}
                isReadOnly={!isEditing}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel>Phone</FormLabel>
              <Input
                value={profile.phone}
                isReadOnly={!isEditing}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
              />
            </FormControl>

            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                value={profile.address}
                isReadOnly={!isEditing}
                onChange={(e) =>
                  setProfile({ ...profile, address: e.target.value })
                }
              />
            </FormControl>

            <Button
              colorScheme="blue"
              onClick={() => {
                if (isEditing) {
                  handleSave()
                } else {
                  setIsEditing(true)
                }
              }}
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default Profile
