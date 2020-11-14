const initState = {
  activeCumulative: true,
  activeTimeline: false,
  allLocations: [],
  cases: 'confirmed',
  computedData: [],
  dashboardTimeline: [],
  globalValues: {},
  hasErrors: false,
  keyframes: [],
  locations: [],
  nowCase: 3,
  numberOfCases: 0,
  timelineCases: [],
  timelineCasesLoaded: false,
  timelineLength: 0,
  timestamp:[],
  timelineState: 'play',
  lastDate: [],
}

const dataReducer = (state = initState, action )=>{
  if(action.type === 'SET_DATE'){
    let newState = { ...state };
    newState.date = action.date
    return newState;
  }
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
    newState.timelineCasesLoaded = true;
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
  if(action.type === 'CHANGE_NOWCASE'){
    let newState = { ...state };
    console.log('action',action)
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
  if(action.type === 'SET_DATAARR'){
    let newState = { ...state };
    newState.dataArr = action.dataArr;
    return newState;
  }
  if(action.type === 'SET_KEYFRAMES'){
    let newState = { ...state };
    newState.keyframes = action.keyframes;
    return newState;
  }
  if(action.type === 'SET_PREV'){
    let newState = { ...state };
    newState.prev = action.prev;
    return newState;
  }
  if(action.type === 'SET_NEXT'){
    let newState = { ...state };
    newState.prev = action.next;
    return newState;
  }
  if(action.type === 'SET_FIRSTPAGE'){
    let newState = { ...state };
    newState.displayFirstPage = action.displayFirstPage;
    return newState;
  }
  if(action.type === 'SET_TIMELINESTATE'){
    let newState = { ...state };
    newState.timelineState = action.stateTimeline;
    return newState;
  }
  if(action.type === 'SET_LASTDATE'){
    let newState = { ...state };
    newState.lastDate = action.lastDate;
    return newState;
  }
  return state;
}

export default dataReducer;