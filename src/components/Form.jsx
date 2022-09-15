import React from "react";

import FormError from "./FormError";

import Cleave from "cleave.js/react";

const Form = ({ state, dispatch, complete }) => {
  const textInputClass =
    "px-[1rem] py-[0.55rem] border border-solid border-light-grayish-violet rounded text-[1.1rem] tracking-[0.015rem] text-very-dark-violet placeholder:text-dark-grayish-violet placeholder:opacity-50 focus:outline-none focus:border-very-dark-violet";
  const textInputInvalidClass =
    "px-[1rem] py-[0.55rem] border border-solid border-error-red rounded text-[1.1rem] tracking-[0.015rem] text-very-dark-violet placeholder:text-dark-grayish-violet placeholder:opacity-50 focus:outline-none focus:border-error-red focus:ring-1 focus:ring-error-red";
  const textLabelClass =
    "uppercase text-[0.75rem] tracking-[0.125rem] mt-[0.6rem] text-very-dark-violet lg:mt-0";
  const buttonSubmitClass =
    "bg-very-dark-violet text-white rounded-lg py-[0.85rem] mt-[1.1rem] text-[1.1rem] lg:mt-[8px]";

  const luhnCheck = (arr) => {
    return (
      arr
        .map((val, ind, arr) => +val * (2 - ((ind + arr.length) % 2)))
        .map((val) => {
          if (val >= 10) {
            return val - 9;
          } else {
            return val;
          }
        })
        .reduce((total, val) => total + val) %
        10 ===
      0
    );
  };

  const handleSubmit = () => {
    console.log("submit");

    dispatch({ type: "RESETERROR" });

    let isError = false;
    // not empty validation
    if (state.name === "") {
      dispatch({
        type: "INVALID",
        value: { field: "fname", error: "Can't be blank" },
      });
      isError = true;
    }
    if (state.number === "") {
      dispatch({
        type: "INVALID",
        value: { field: "fnumber", error: "Can't be blank" },
      });
      isError = true;
    }
    if (state.cvc === "") {
      dispatch({
        type: "INVALID",
        value: { field: "fcvc", error: "Can't be blank" },
      });
      isError = true;
    }
    if (state.month === "" || state.year === "") {
      dispatch({
        type: "INVALID",
        value: { field: "fdate", error: "Can't be blank" },
      });
      isError = true;
    }

    // date validation
    if (!/^[01][0-9]$/.test(state.month)) {
      dispatch({
        type: "INVALID",
        value: { field: "fdate", error: "Invalid date" },
      });
      isError = true;
    } else if (+state.month < 1 || +state.month > 12) {
      dispatch({
        type: "INVALID",
        value: { field: "fdate", error: "Invalid date" },
      });
      isError = true;
    } else if (!/^[0-9][0-9]$/.test(state.year)) {
      dispatch({
        type: "INVALID",
        value: { field: "fdate", error: "Invalid date" },
      });
      isError = true;
    } else if (
      +(state.year + state.month) <
      (new Date().getFullYear() % 100) * 100 + new Date().getMonth() + 1
    ) {
      dispatch({
        type: "INVALID",
        value: { field: "fdate", error: "Card is expired" },
      });
      isError = true;
    }

    // cvc/cvv
    if (!/^[0-9]{3,4}$/.test(state.cvc)) {
      dispatch({
        type: "INVALID",
        value: { field: "fcvc", error: "Invalid CVV/CVC" },
      });
      isError = true;
    }

    // credit card number only digits
    if (!/^\d\d*\d$/.test(state.snumber)) {
      dispatch({
        type: "INVALID",
        value: { field: "fnumber", error: "Only digits allowed" },
      });
      isError = true;
    } else if (
      /^4/.test(state.snumber) &&
      (state.snumber.length === 13 || state.snumber.length === 16)
    ) {
      console.log("VISA");
    } else if (/^3[47]/.test(state.snumber) && state.snumber.length === 15) {
      console.log("AMEX");
    } else if (/^5[1-5]/.test(state.snumber) && state.snumber.length === 16) {
      console.log("MASTERCARD");
    } else {
      dispatch({
        type: "INVALID",
        value: { field: "fnumber", error: "Invalid card" },
      });
      isError = true;
    }

    console.log('luhn: ',luhnCheck([...state.snumber]))

    //if all until now is OK, check card number with Luhn
    if (!isError && luhnCheck([...state.snumber])) {
        complete();
    }
  };

  return (
    <div className="px-6 mt-[4.95rem] w-full lg:w-[40%] lg:mt-0 flex justify-center lg:justify-end">
      <form className="flex flex-col gap-2 justify-center h-full w-[380px] lg:gap-[10px]">
        <label htmlFor="fname" className={textLabelClass}>
          Cardholder name
        </label>
        <input
          type="text"
          className={
            state.formErrors.fname ? textInputInvalidClass : textInputClass
          }
          id="fname"
          name="fname"
          placeholder="e.g. Jane Appleseed"
          onChange={(e) => {
            dispatch({ type: "SETNAME", value: e.target.value });
          }}
        ></input>
        <FormError message={state.formErrors.fname} />

        <label htmlFor="fnumber" className={textLabelClass}>
          Card number
        </label>
        <Cleave
          options={{ creditCard: true }}
          className={
            state.formErrors.fnumber ? textInputInvalidClass : textInputClass
          }
          id="fnumber"
          name="fnumber"
          placeholder="e.g. 1234 5678 9123 0000"
          onChange={(e) => {
            dispatch({
              type: "SETNUMBER",
              value: [e.target.value, e.target.rawValue],
            });
          }}
        ></Cleave>
        <FormError message={state.formErrors.fnumber} />

        <div className="grid grid-cols-4 grid-rows-1 max-w-screen gap-x-[0.5rem] lg:gap-x-[10px]">
            <span
                id="date-label"
                className={textLabelClass + " col-span-2 col-start-1"}
            >
                {"Exp. date (mm/yy)"}
            </span>
            <label
                htmlFor="fcvc"
                className={textLabelClass + " col-span-2 col-start-3"}
            >
            CVC
          </label>
        </div>

        <div className="grid grid-cols-4 grid-rows-1 max-w-screen gap-x-[0.5rem] lg:gap-x-[10px]">
            <Cleave
                options={{
                blocks: [2],
                numericOnly: true,
                }}
                className={`${
                state.formErrors.fdate ? textInputInvalidClass : textInputClass
                } col-span-1 col-start-1`}
                id="fmonth"
                name="fmonth"
                placeholder="MM"
                aria-labelledby="date-label"
                onChange={(e) => {
                dispatch({ type: "SETMONTH", value: e.target.value });
                }}
            ></Cleave>
            <Cleave
                options={{
                blocks: [2],
                numericOnly: true,
                }}
                className={`${
                state.formErrors.fdate ? textInputInvalidClass : textInputClass
                } col-span-1 col-start-2`}
                id="fyear"
                name="fyear"
                placeholder="YY"
                aria-labelledby="date-label"
                onChange={(e) => {
                dispatch({ type: "SETYEAR", value: e.target.value });
                }}
            ></Cleave>
            <Cleave
                options={{
                blocks: [3],
                numericOnly: true,
                }}
                className={`${
                state.formErrors.fcvc ? textInputInvalidClass : textInputClass
                } col-span-2 col-start-3`}
                id="fcvc"
                name="fcvc"
                placeholder="e.g. 123"
                onChange={(e) => {
                dispatch({ type: "SETCVC", value: e.target.value });
                }}
            ></Cleave>
        </div>

        <div className="grid grid-cols-4 grid-rows-1 max-w-screen gap-x-[0.5rem] lg:gap-x-[16px]">
          <FormError
            message={state.formErrors.fdate}
            addClass="col-start-1 mt-2 col-span-2"
          />
          <FormError
            message={state.formErrors.fcvc}
            addClass="col-start-3 mt-2 col-span-2"
          />
        </div>

        <input
          type="button"
          value="Confirm"
          onClick={handleSubmit}
          className={buttonSubmitClass}
        ></input>
      </form>
    </div>
  );
};

export default Form;
