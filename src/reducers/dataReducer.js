const initState = {
  hasErrors: false,
  activeCumulative: true,
  activeTimeline: false,
  locations: [],
  allLocations: [],
  cases: 'confirmed',
  timelineCases: [],
  dashboardTimeline: [],
  timelineLength: 0,
  numberOfCases: 0,
  nowCase: 3,
  globalValues: {},
  timestamp:[]
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
  if(action.type === 'TOGGLE_TIMELINE'){
    let newState = { ...state };
    newState.activeCumulative = action.active.activeCumulative;
    newState.activeTimeline = action.active.activeTimeline;
    newState.nowCase = action.active.nowCase;
    return newState;
  }
  if(action.type === 'TOGGLE_CUMULATIVE'){
    let newState = { ...state };
    newState.activeCumulative = action.active.activeCumulative;
    newState.activeTimeline = action.active.activeTimeline;
    return newState;
  }
  if(action.type === 'ADD_TIMELINECASES'){
    let newState = { ...state };
    newState.timelineCases = action.timelineCases;
    return newState;
  }
  if(action.type === 'SET_DASHBOARDTIMELINE'){
    let newState = { ...state };
    newState.dashboardTimeline = action.dashboardTimeline;
    return newState;
  }
  if(action.type === 'SET_TIMELINELENGTH'){
    let newState = { ...state };
    newState.timelineLength = action.timelineLength;
    return newState;
  }
  if(action.type === 'ADD_NUMBEROFCASES'){
    let newState = { ...state };
    newState.numberOfCases = action.numberOfCases;
    return newState;
  }
  if(action.type === 'ADD_NOWCASE'){
    let newState = { ...state };
    newState.nowCase = action.nowCase;
    return newState;
  }
  if(action.type === 'ADD_INTERVALID'){
    let newState = { ...state };
    newState.intervalId = action.intervalId;
    return newState;
  }
  if(action.type === 'SET_MINRADIUS'){
    let newState = { ...state };
    newState.minRadius = action.minRadius;
    return newState;
  }
  if(action.type === 'SET_MAXRADIUS'){
    let newState = { ...state };
    newState.maxRadius = action.maxRadius;
    return newState;
  }
  if(action.type === 'SET_TIMESTAMP'){
    let newState = { ...state };
    newState.timestamp = action.timestamp;
    return newState;
  }
  return state;
}

export default dataReducer;