import React, { useState, useEffect } from "react";
import "./App.css";

const pokemons = [
  {
    id: "1",
    name: "Bulbasaur",
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
    abilities: ["Overgrow"],
    weakness: ["Fire", "Flying", "Ice", "Psychic"],
    type: ["grass", "poison"],
    weight: 15.2
  },
  {
    id: "2",
    name: "Ivysaur",
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/002.png",
    abilities: ["Overgrow"],
    weakness: ["Fire", "Flying", "Ice", "Psychic"],
    type: ["grass", "poison"],
    weight: 28.7
  },
  {
    id: "3",
    name: "Beedrill",
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/015.png",
    abilities: ["Swarm"],
    weakness: ["Fire", "Flying", "Psychic", "Rock"],
    type: ["bug", "poison"],
    weight: 65
  },
  {
    id: "4",
    name: "Raichu",
    image: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/026.png",
    abilities: ["Surge Surfer"],
    weakness: ["Ghost", "Dark", "Bug", "Ground"],
    type: ["electric", "psychic"],
    weight: 46.3
  }
];

function App() {
  const [pokes, setPokes] = useState([]);
  const [compareList, setCompareList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [attributes, setAttributes] = useState([]);
  const [searchText, setSearchText] = useState("");

  function addToCompareList(poke) {
    return setCompareList(compareList => [...compareList, poke]);
  }

  function onTextChange(searchText) {
    return setSearchText(searchText);
  }

  function removeFromCompareList(poke) {
    let valueIndex = compareList.indexOf(poke);
    compareList.splice(valueIndex, 1);
    return setCompareList(compareList);
  }
  function openDialogF() {
    return setOpenDialog(!openDialog);
  }
  function changeAttributes(event) {
    let checkedArray = attributes;
    let selectedValue = event.target.value;

    if (event.target.checked === true) {
      checkedArray.push(selectedValue);
      setAttributes(checkedArray);
    } else {
      event.target.checked = false;
      let valueIndex = checkedArray.indexOf(selectedValue);
      console.log(valueIndex);
      checkedArray.splice(valueIndex, 1);

      setAttributes(checkedArray);
    }
  }

  function getCompareList() {
    return (
      <div className="horizontal-table">
        <div>
          <h1 className="attribute" onClick={openDialogF.bind(this)}>
            Attributes
          </h1>
          {attributes.map(value => (
            <h3 key={value}>{value}</h3>
          ))}
        </div>
        {compareList.map(obj => (
          <div className="objectTile" key={obj.id}>
            <h1>{obj.name}</h1>
            {attributes.map(value => (
              <h3>{obj[value]}</h3>
            ))}
            {/* <h1>{obj.name}</h1>
            <h3>{obj.id}</h3>
            <h3>{obj.name}</h3>
            <h3>{obj.image}</h3>
            <h3>{obj.abilities.join(", ")}</h3>
            <h3>{obj.weakness.join(", ")}</h3>
            <h3>{obj.type.join(", ")}</h3>
            <h3>{obj.weight}</h3> */}
          </div>
        ))}
      </div>
    );
  }

  function getPockemons(pokes) {
    console.log("pokes", pokes);
    return pokes.map(poke => (
      <div key={poke.id} className="poki-container">
        <div className="poki-image">
          <img src={poke.image} alt="pokemon" />
          <button
            onClick={
              !compareList.includes(poke)
                ? addToCompareList.bind(this, poke)
                : removeFromCompareList.bind(this, poke)
            }
            className="btn"
          >
            {!compareList.includes(poke) ? "Compare" : "remove"}
          </button>
        </div>
        <h1>{poke.name}</h1>
        <h3>
          {poke.abilities.map((i, ab) => (
            <div key={ab}>{i}</div>
          ))}
        </h3>
      </div>
    ));
  }

  useEffect(() => {
    setPokes(pokemons);
    // setAttributes(Object.keys(pokemons[0]));
  }, []);
  console.log(pokes, attributes);
  return (
    <div className="App">
      <dialog id="styledModal" open={openDialog}>
        <form>
          <input
            type="text"
            value={searchText}
            onChange={event => setSearchText(event.target.value)}
            placeholder="search"
          ></input>

          {pokes[0]
            ? Object.keys(pokes[0]).map((poke, i) => (
                <div>
                  {searchText === "" ||
                  new RegExp(searchText, "i").test(poke) ? (
                    <div>
                      <input
                        id={"string_" + i}
                        className="checkbox"
                        onChange={changeAttributes.bind(this)}
                        type="checkbox"
                        value={poke}
                      />
                      <label>{poke}</label>{" "}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              ))
            : ""}
        </form>
        <button onClick={openDialogF.bind(this)}> Apply</button>
      </dialog>
      <div className="poke-list">
        {pokes.length > 0 ? getPockemons(pokes) : ""}
      </div>
      {console.log("compareList", compareList)}
      <div className="poke-compare-list">
        {compareList.length > 1 ? (
          getCompareList()
        ) : (
          <div>add more items to compare</div>
        )}
      </div>
    </div>
  );
}

export default App;
