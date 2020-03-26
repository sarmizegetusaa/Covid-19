const initState = {
  hasErrors: false,
  locations: [],
  allLocations: [],
  cases: 'confirmed',
  globalValues: {}
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
  if(action.type === 'CHNAGE_CASES'){
    let newState = { ...state };
    newState.cases = action.cases;
    return newState;
  }
  if(action.type === 'ADD_GLOBALVALUES'){
    let newState = { ...state };
    newState.globalValues = action.globalValues;
    return newState;
  }
  return state;
}

export default dataReducer;