const initState = {
  hasErrors: false,
  locations: [],
  allLocations: []
}

const dataReducer = (state = initState, action )=>{
  if(action.type === 'ADD_LOCATIONS'){
    let newState = { ...state };
    newState.locations = action.locations
    return newState;
  }
  if(action.type === 'ADD_ALLLOCATIONS'){
    let newState = { ...state };
    newState.allLocations = action.allLocations;
    return newState;
  }
  return state;
}

export default dataReducer;