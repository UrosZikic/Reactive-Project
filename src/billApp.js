import "./App.css";
import { useEffect, useState } from "react";

export default function App() {
  // chosen user state
  const [chosen, setChosen] = useState(0);
  const [chosenName, setChosenName] = useState("");
  // bill state, my expense state
  const [bill, setBill] = useState(-1);
  const [myExpense, setMyExpense] = useState(0);
  const [yourExpense, setYourExpense] = useState(0);
  //  confirmed state
  const [confirmed, setConfirmed] = useState(false);
  // confirmed payer
  const [payer, setPayer] = useState("me");
  //  set user function
  function handleChosen(id, name) {
    setChosen(id);
    setChosenName(name);
  }
  // set bill, expense function
  function handleBill(event) {
    setBill(parseInt(event.target.value));
  }
  function handleMyExpense(event) {
    setMyExpense(
      parseInt(event.target.value) > bill ? bill : parseInt(event.target.value)
    );
  }
  function handleYourExpense() {
    setYourExpense(bill - myExpense);
  }
  function handlePayer(event) {
    setPayer(event.target.value);
  }
  // confirm function
  function confirm() {
    setConfirmed(true);
    handleYourExpense();

    function reset() {
      setConfirmed(false);
      setChosen("");
      setBill(0);
      setMyExpense(0);
      setYourExpense(0);
      setPayer("me");
    }
    setTimeout(() => reset(), 500);
  }

  return (
    <div>
      <Users
        handleChosen={handleChosen}
        myExpense={myExpense}
        yourExpense={yourExpense}
        chosen={chosen}
        payer={payer}
        confirm={confirmed}
      />
      {chosen && (
        <Counter
          chosenName={chosenName}
          bill={bill}
          handleBill={handleBill}
          myExpense={myExpense}
          handleMyExpense={handleMyExpense}
          handlePayer={handlePayer}
          confirm={confirm}
        />
      )}
    </div>
  );
}

function Users({
  handleChosen,
  yourExpense,
  chosen,
  payer,
  confirm,
  myExpense,
}) {
  return (
    <div>
      <User
        id={1}
        name="Uros"
        handleChosen={handleChosen}
        myExpense={myExpense}
        yourExpense={yourExpense}
        chosen={chosen}
        payer={payer}
        confirm={confirm}
      />
      <User
        id={2}
        name="Milos"
        handleChosen={handleChosen}
        myExpense={myExpense}
        yourExpense={yourExpense}
        chosen={chosen}
        payer={payer}
        confirm={confirm}
      />
      <User
        id={3}
        name="Milos"
        handleChosen={handleChosen}
        myExpense={myExpense}
        yourExpense={yourExpense}
        chosen={chosen}
        payer={payer}
        confirm={confirm}
      />
    </div>
  );
}

function User({
  id,
  name,
  handleChosen,
  myExpense,
  yourExpense,
  chosen,
  payer,
  confirm,
}) {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (chosen === id && confirm) {
      setBalance((curVal) => {
        let updatedBalance = parseInt(curVal);

        if (payer === "me") {
          updatedBalance += parseInt(yourExpense);
        } else {
          console.log("happened");
          updatedBalance -= parseInt(myExpense);
        }
        return updatedBalance;
      });
    }
  }, [chosen, confirm, myExpense, name, payer, yourExpense]);

  return (
    <div>
      <p>{name}</p>
      <p>
        Balance:{" "}
        {balance > 0
          ? `${name} owes me ${balance}$`
          : `I owe ${name} ${balance}$`}
      </p>
      {/* set user function */}
      <button onClick={() => handleChosen(id, name)}>choose</button>
    </div>
  );
}

function Counter({
  chosenName,
  bill,
  handleBill,
  myExpense,
  handleMyExpense,
  handlePayer,
  confirm,
}) {
  const yourExpense = bill > myExpense ? bill - myExpense : 0;
  return (
    <div>
      <div>
        <label htmlFor="bill">bill</label>
        <input
          type="number"
          id="bill"
          value={bill < 0 ? "" : bill}
          onChange={handleBill}
        />
      </div>
      <div>
        <label htmlFor="myExpense">My expense</label>
        <input
          type="number"
          id="myExpense"
          value={!isNaN(myExpense) && myExpense}
          onChange={handleMyExpense}
        />
      </div>
      <div>
        <p>
          {chosenName}'s expense: {yourExpense}
        </p>
      </div>
      <div>
        <label htmlFor="payer">Who's paying?</label>
        <select name="payer" id="payer" onChange={handlePayer}>
          <option value="me">Me</option>
          <option value={chosenName}>{chosenName}</option>
        </select>
      </div>
      <button onClick={confirm}>confirm</button>
    </div>
  );
}
