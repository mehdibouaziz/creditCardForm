import React from "react";
import { useReducer, useState } from "react";

import CardBack from './CardBack'
import CardFront from './CardFront'
import Form from "./Form";
import Complete from "./Complete";
import BackgroundGraphic from "./BackgroundGraphic";

const initialCard = {
  name: "",
  number: "",
  snumber: "",
  month: "",
  year: "",
  cvc: "",
  formErrors: {
    fname: "",
    fnumber: "",
    fdate: "",
    fcvc: "",
  },

};

const cardReducer = (state, action) => {
  switch (action.type) {
    case "SETNAME":
      return { ...state, name: action.value.toUpperCase() };
    case "SETNUMBER":
      return { ...state, number: action.value[0], snumber: action.value[1] };
    case "SETMONTH":
      return { ...state, month: action.value };
    case "SETYEAR":
      return { ...state, year: action.value };
    case "SETCVC":
      return { ...state, cvc: action.value };
    case "INVALID":
      return {...state, formErrors: {...state.formErrors, [action.value.field]:action.value.error}};
    case "RESETERROR":
      return {...state, formErrors: {
        fname: "",
        fnumber: "",
        fdate: "",
        fcvc: "",
      }}
    case "RESETFORM":
      return {...state, ...initialCard}
    default:
      return state;
  }
};

const Page = () => {
  const [isFormComplete, setIsFormComplete] = useState(true);
  const [state, dispatch] = useReducer(cardReducer, initialCard);
  const buttonContinue = () => {
    console.log('continue')
    dispatch({type:'RESETFORM'});
    setIsFormComplete(false);
  }

  return (
    <div className="h-full w-full flex flex-col justify-start font-card lg:flex-row lg:gap-[180px]">
      <CardFront info={{...state}}/>
      <CardBack cvc={state.cvc}/>
      <BackgroundGraphic />

      {isFormComplete ? <></> : <Form dispatch={dispatch} state={state} complete={() => setIsFormComplete(true)}/>}
      {!isFormComplete ? <></> : <Complete buttonContinue={buttonContinue} />}

    </div>
  );
};

export default Page;
