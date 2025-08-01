import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];


export default function App() {

  const [friends, setFriends] = useState(initialFriends);
  const [showAddFreiend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handlerShowAddFriend() {

    setShowAddFriend(show => !show);

  }

  function handleAddFriend(friend) {
    setFriends(friends => [...friends, friend]);
    setShowAddFriend(false)

  }

  function handleSelection(friend) {
    setSelectedFriend(cur =>
      cur?.id === friend.id ? null : friend);
    setShowAddFriend(false);

  }
  return (
    <div className="app">
      <div className="sidebar">


        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
        />

        {showAddFreiend && <FormAddFriend onAddFreiend={handleAddFriend} />}

        <Button onClick={handlerShowAddFriend} >
          {showAddFreiend ? "Close" : "Add friend"}
        </Button>
      </div>
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} />}

    </div>
  )
};

function Button({ children, onClick }) {

  return <button onClick={onClick} className="button">{children}</button>

}

function FriendsList({ friends, onSelection, selectedFriend }) {

  return (
    <ul>
      {
        friends.map(
          (friend) => (
            <Friend
              key={friends.id}
              friend={friend}
              onSelection={onSelection}
              selectedFriend={selectedFriend}
            />
          ))}
    </ul>
  )
}

function Friend({ friend, onSelection, selectedFriend }) {

  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className={isSelected ? "selected" : ""}>

      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 &&
        <p className="red">
          You owe {friend.name}{Math.abs(friend.balance)}$
        </p>}
      {friend.balance > 0 &&
        <p
          className="green">{friend.name} owes you {Math.abs(friend.balance)}$
        </p>}
      {friend.balance === 0 &&
        <p>
          You and {friend.name} are even
        </p>}

      <Button onClick={() => onSelection(friend)}>{isSelected ? "Close" : "Select"}</Button>
    </li>
  )
}


function FormAddFriend({ onAddFreiend }) {

  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handlerSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID()
    const newFriend = {
      name,
      id,
      image: `${image}?=${id}`,
      balance: 0,

    };
    onAddFreiend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");

  }

  return <form className="form-add-friend" onSubmit={handlerSubmit}>

    <label>👥Friend name</label>
    <input type="text" value={name} onChange={e => setName(e.target.value)} />

    <label>🌆Image URL</label>
    <input type="text" value={image} onChange={e => setImage(e.target.value)} />

    <Button>Add</Button>
  </form>
}

function FormSplitBill({ selectedFriend }) {
const [bill,setBill]=useState("");
const[paidByUser,setPaidByUser]=useState("");
const paidByFriend = bill ? bill - paidByUser :"";

const [whoIsPaying,setWhoIsPaying]=useState("user")


  return <form className="form-split-bill">
    <h2> Split a bill with {selectedFriend.name}</h2>

    <label>💰Bill value</label>
    <input type="text" 
     value={bill} 
     onChange={e=> setBill(Number(e.target.value))}/>


    <label>👤Your expense</label>
    <input type="text"
     value={paidByUser} 
     onChange={e=> setPaidByUser(Number(e.target.value)> bill ? paidByUser : 
     Number(e.target.value))} />


    <label>👥{selectedFriend.name}-s expense</label>
    <input type="text" disabled value={paidByFriend}/>

    <label>🤑Who is paying the bill?</label>

    <select
     value={whoIsPaying} onChange={e=> setWhoIsPaying(e.target.value)} >
      <option value="user">You</option>
      <option value="friend">{selectedFriend.name}</option>
    </select>

    <Button>Split bill</Button>

  </form>
}