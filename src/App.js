// Learning useReducer Function  
import {useReducer} from 'react'
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';
export const ACTIONS = {
  ADD_DIGIT : 'add-digit',
  CLEAR : 'clear',
  DEL_DEGIT : 'del-digit',
  CHOOSE_OPERATION : 'choose-operation',
  EVALUATE : 'evaluate'
}
function reducer(state /* State by default is send */, {type , payload }){
   switch (type) {
    case ACTIONS.ADD_DIGIT:
        if(state.overwrite){
          return {
            ...state ,
            currentOperand : payload.digit ,
            overwrite : false
          }
        }
        if(payload.digit === '0' && state.currentOperand === '0') {
          return state 
        } 
        if(payload.digit === '.' && state.currentOperand.includes('.')){
          return state 
        }
        return {
          ...state ,
          currentOperand : `${state.currentOperand || ""}${payload.digit}`
        }
    case ACTIONS.CLEAR :
      return {previousOperand : null , currentOperand : null , operation : null}
      default:
        return state; 
    case ACTIONS.CHOOSE_OPERATION :
        console.log('activated')
        console.log(state.currentOperand , state.previousOperand)
        if (state.currentOperand === null && state.previousOperand === null ){
          return state
        }
        if (state.previousOperand === null){
          return {
            ...state ,
            previousOperand : state.currentOperand ,
            currentOperand : null ,
            operation : payload.operation
          }
        }
        if (state.currentOperand === null){
          return {
            ...state ,
            operation : payload.operation
          }
        }
        if(state.operation !== null && state.currentOperand === null ){
          console.log('operation is null');
          return state
        }
        return {
          ...state ,  
          previousOperand : evaluate(state),
          operation : payload.operation ,
          currentOperand : null ,
        }
    case ACTIONS.EVALUATE :
      if (state.currentOperand === null){
         return {
          ...state,
          currentOperand : state.previousOperand ,
          previousOperand : null,
          operation : null
         }
      }
      if (state.previousOperand === null ){
        return state
      }
      return {
        ...state ,
        overwrite : true ,
        previousOperand : null ,
        currentOperand : evaluate(state) ,
        operation : null
      } 
    case ACTIONS.DEL_DEGIT :
      if (state.currentOperand === null){
        return {
          ...state ,
          currentOperand : state.previousOperand ,
          previousOperand : null ,
          operation : null
        }
      }
      console.log(state.currentOperand);
      return {
        ...state ,
        currentOperand : state.currentOperand.slice(0 , state.currentOperand.length-1) === "" ? null : state.currentOperand.slice(0 , state.currentOperand.length-1) 
      }
      
        
   }
   
  
}

function evaluate({currentOperand , previousOperand , operation}){
  const prevNumber = parseFloat(previousOperand);
  const currNumber = parseFloat(currentOperand);
  // if (isNaN(prevNumber) || isNaN(currNumber)) return ""
  let computation = 0
  // eslint-disable-next-line default-case
  switch (operation) {
    case '+' :
      computation = (prevNumber + currNumber);
      break
    case '-' :
      computation = (prevNumber - currNumber);
      break
    case '*' :
      computation = (prevNumber * currNumber) ;
      break
    case '÷' :
      computation = (prevNumber / currNumber);
      break
  }
  return computation.toFixed(2);
  



}



function App() {
  const [{previousOperand , currentOperand , operation} , dispatch] = useReducer(reducer , {previousOperand : null , currentOperand : null , operation : null})

  return (
    <div className="grid-calculator">
      <div className="output screen">
        <div className="previous-operand">{previousOperand} {operation} </div>
        <div className="current-operand">{currentOperand} </div>
      </div>
      <button className='btn span-two' onClick={()=>dispatch({type:ACTIONS.CLEAR,payload:{operation}})}>AC</button>
      <button className='btn backspace' onClick={()=>dispatch({type:ACTIONS.DEL_DEGIT,payload:{operation}})}>DEL</button>
   
      <OperationButton operation='÷' dispatch={dispatch} />

      <DigitButton digit='1' dispatch={dispatch}/>
      <DigitButton digit='2' dispatch={dispatch}/>
      <DigitButton digit='3' dispatch={dispatch}/>

      <OperationButton operation='*' dispatch={dispatch} />

      <DigitButton digit='4' dispatch={dispatch}/>
      <DigitButton digit='5' dispatch={dispatch}/>
      <DigitButton digit='6' dispatch={dispatch}/>

      <OperationButton operation='+' dispatch={dispatch} />

      <DigitButton digit='7' dispatch={dispatch}/>
      <DigitButton digit='8' dispatch={dispatch}/>
      <DigitButton digit='9' dispatch={dispatch}/>

      <OperationButton operation='-' dispatch={dispatch} />

      <DigitButton digit='.' dispatch={dispatch}/>
      <DigitButton digit='0' dispatch={dispatch}/>
      <button className='btn equals span-two' onClick={()=> dispatch({type:ACTIONS.EVALUATE})}>=</button>
    </div>

  )
}

export default App;
