import React, { createContext, useContext, useReducer } from 'react'

const CaloriesTrackerContext = createContext()

export const useCaloriesTracker = () => {
  return useContext(CaloriesTrackerContext)
}

const initialState = {
  totalCalories: 0,
  items: [],
}

const actionTypes = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
}

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload.item],
        totalCalories: state.totalCalories + action.payload.item.calories,
      }
    case actionTypes.REMOVE_ITEM:
      const removedItem = state.items[action.payload.index]
      return {
        ...state,
        items: state.items.filter((_, index) => index !== action.payload.index),
        totalCalories: state.totalCalories - removedItem.calories,
      }
    default:
      return state
  }
}

export const CaloriesTrackerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const addItem = (item) => {
    dispatch({ type: actionTypes.ADD_ITEM, payload: { item } })
  }

  const removeItem = (index) => {
    dispatch({ type: actionTypes.REMOVE_ITEM, payload: { index } })
  }

  const contextValue = {
    totalCalories: state.totalCalories,
    items: state.items,
    addItem,
    removeItem,
  }

  return (
    <CaloriesTrackerContext.Provider value={contextValue}>
      {children}
    </CaloriesTrackerContext.Provider>
  )
}
