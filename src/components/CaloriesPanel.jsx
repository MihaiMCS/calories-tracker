import React, { useState } from 'react'
import {
  Box,
  Heading,
  Text,
  Button,
  Input,
  VStack,
  FormControl,
  FormLabel,
  SimpleGrid,
} from '@chakra-ui/react'
import { useCaloriesTracker } from '../contexts/CaloriesTrackerContext'

function CaloriesPanel() {
  const { totalCalories, items, addItem, removeItem } = useCaloriesTracker()
  const [nameInput, setNameInput] = useState('')
  const [gramsInput, setGramsInput] = useState('')
  const [caloriesPer100gInput, setCaloriesPer100gInput] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleAddItem = () => {
    if (!nameInput || !gramsInput || !caloriesPer100gInput) {
      setErrorMessage('Please complete all fields.')
      return
    }

    if (!/^\d+$/.test(gramsInput) || !/^\d+$/.test(caloriesPer100gInput)) {
      setErrorMessage('Grams and Calories per 100g should be valid numbers.')
      return
    }

    const actualCalories =
      (parseInt(gramsInput) * parseInt(caloriesPer100gInput)) / 100
    const newItem = {
      name: nameInput,
      calories: actualCalories,
    }
    addItem(newItem)
    setNameInput('')
    setGramsInput('')
    setCaloriesPer100gInput('')
    setErrorMessage('') // Clear error message
  }

  const handleRemoveItem = (index) => {
    removeItem(index)
  }

  return (
    <Box p={4} textAlign='center'>
      <Heading mb={4} fontSize='3xl' color='teal.500'>
        Calories Tracker
      </Heading>
      <VStack spacing={4} align='center'>
        <Text fontSize='xl' fontWeight='bold'>
          Total Calories: {totalCalories.toFixed(2)}
        </Text>
        <FormControl>
          <FormLabel>Item Name</FormLabel>
          <Input
            placeholder='Enter item name'
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Grams</FormLabel>
          <Input
            type='number'
            placeholder='Enter grams'
            value={gramsInput}
            onChange={(e) => setGramsInput(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Calories per 100g</FormLabel>
          <Input
            type='number'
            placeholder='Enter calories per 100g'
            value={caloriesPer100gInput}
            onChange={(e) => setCaloriesPer100gInput(e.target.value)}
          />
        </FormControl>
        {errorMessage && <Text color='red'>{errorMessage}</Text>}
        <Button colorScheme='teal' onClick={handleAddItem}>
          Add Item
        </Button>
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} mt={4}>
          {items.map((item, index) => (
            <Box
              key={index}
              borderWidth='1px'
              borderRadius='md'
              boxShadow='md'
              p={4}
              textAlign='center'
            >
              <Text fontSize='lg' fontWeight='bold'>
                {item.name}
              </Text>
              <Text fontSize='md' color='gray.600'>
                {item.calories.toFixed(2)} calories
              </Text>
              <Button
                colorScheme='red'
                size='sm'
                mt={2}
                onClick={() => handleRemoveItem(index)}
              >
                Remove
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  )
}

export default CaloriesPanel
