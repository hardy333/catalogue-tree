import { useEffect, useState } from "react";
import "./App.css";
import { data } from "./data.js";
import foodmartData from "./foodmart.json"
import gdmData from "./gdm.json"
import pepsiData from "./pepsi.json"
import deilyData from "./deily.json"



// let startData = deilyData;
// let startData = foodmartData
// let startData = gdmData
let startData = pepsiData

// categoryID
// parentFolder
const levelOneArr = [];
let protectCount = 10000;
let count = 0;

while (startData.length > 0) {
  startMakingTree();
  startData = startData.filter((cat) => !cat.wasFound);
  count++;
  if (count > protectCount) {
    break;
  }
}



function startMakingTree() {

  startData.forEach((currCat, index) => {
    
    if (currCat.parentFolder === "") {
      levelOneArr.push(currCat);
      currCat.wasFound = true;

      return;
    }



    for (let i = 0; i < levelOneArr.length; i++) {
      const levelOneCat = levelOneArr[i];

      if (currCat.parentFolder === levelOneCat.categoryID) {
        add_child_to_cat(levelOneCat, currCat);
        break;
      } else if (levelOneCat.parentFolder === currCat.categoryID) {
        add_child_to_cat(currCat, levelOneCat);
        levelOneArr[i] = currCat;
        break;
      } else if (!levelOneCat.children || levelOneCat.children.length === 0) {
        continue;
      } else {
        find_parent(levelOneCat.children, currCat);
      }
    }

    if (!currCat.wasFound) {
      find_parent_in_start_data(currCat);
    }
  });
}

// Edge Case when cuurCat will not find parent in levelOneArr
function find_parent_in_start_data(currCat) {
  let hasParetnt = false;

  startData.forEach((startDataCat, index) => {
    if (currCat.parentFolder === startDataCat.categoryID) {
      if (startDataCat.children) {
        startDataCat.children.push(currCat);
      } else {
        startDataCat.children = [];
        startDataCat.children.push(currCat);
      }
      hasParetnt = true;
      currCat.wasFound = true;
    }
  });

  if (!hasParetnt) {
    levelOneArr.push(currCat);
    currCat.wasFound = true;
  }
}

// Recursion function 
function find_parent(catArr, currCat) {
  for (let i = 0; i < catArr.length; i++) {
    const potentialParentCat = catArr[i];

    if (currCat.parentFolder === potentialParentCat.categoryID) {
      add_child_to_cat(potentialParentCat, currCat);
      break;
    } else if (potentialParentCat.parentFolder === currCat.categoryID) {
      add_child_to_cat(currCat, potentialParentCat);
      break;
    } else if (
      !potentialParentCat.children ||
      potentialParentCat.children.length === 0
    ) {
      continue;
    } else {
      find_parent(potentialParentCat.children, currCat);
    }
  }
}

// Adds child into the levelOneArr objects
function add_child_to_cat(parent, child) {
  if (parent.children) {
    parent.children.push(child);
  } else {
    parent.children = [];
    parent.children.push(child);
  }

  parent.wasFound = true;
  child.wasFound = true;
}


import copy from 'copy-to-clipboard';





function App() {
  const [arr1, setArr1] = useState(levelOneArr);
  const [arr2, setArr2] = useState([]);
  const [arr3, setArr3] = useState([]);
  const [arr4, setArr4] = useState([]);
  const [arr5, setArr5] = useState([]);

  const changeData = (customerName) => {
    console.log(customerName)
  }
  
  
  const setArr2Ul = (obj) => {
    copy(obj.categoryID)
    setArr2([...obj.children]);
    setArr3([])
    setArr4([])
    console.log(obj.name, obj.categoryID)
  };

  const setArr3Ul = (obj) => {
    copy(obj.categoryID)
    setArr3([...obj.children]);
    setArr4([])
    console.log(obj.name, obj.categoryID)


  };

  const setArr4Ul = (obj) => {
    copy(obj.categoryID)
    setArr4([...obj.children]);
    console.log(obj.name, obj.categoryID)

  };


  return (
    <>
    <div>
      <button onClick={() => changeData("deily")}>Deily</button>
      <button onClick={() => changeData("foodmart")}>Foodmart</button>
      <button onClick={() => changeData("gdm")}>GDM</button>
      <button onClick={() => changeData("pepsi")}>Pepsi</button>
    </div>
    <div className="App">
      {/* <pre> {JSON.stringify(levelOneArr, null, 2)}</pre> */}
      <ul className="arr1-ul">
        <li>რაოდენობა: {arr1.length}</li>
        {arr1.map((obj, i) => {
          return (
            <li
              onClick={() => setArr2Ul(obj)}
              key={obj.id}
              style={{
                textDecoration: obj.children ? "underline" : "",
                color: obj.children ? "red" : "black",
              }}
            >
             <span style={{marginRight: "10px"}}>{i + 1}{") "}</span> {obj.name}
            </li>
          );
        })}
      </ul>
      <ul className="arr2-ul">
      <li>რაოდენობა: {arr2.length}</li>

        {arr2.map((obj,i) => {
          return (
            <li
              onClick={() => setArr3Ul(obj)}
              key={obj.id}
              style={{
                textDecoration: obj.children ? "underline" : "",
                color: obj.children ? "red" : "black",
              }}
            >
             <span style={{marginRight: "10px"}}>{i + 1}{") "}</span> {obj.name}
            </li>
          );
        })}
      </ul>
      <ul className="arr3-ul">
      <li>რაოდენობა: {arr3.length}</li>

        {arr3.map((obj,i) => {
          return (
            <li
              onClick={() => setArr4Ul(obj)}
              key={obj.id}
              style={{
                textDecoration: obj.children ? "underline" : "",
                color: obj.children ? "red" : "black",
              }}
            >
             <span style={{marginRight: "10px"}}>{i + 1}{") "}</span> {obj.name}
            </li>
          );
        })}
      </ul>
      <ul className="arr4-ul">
      <li>რაოდენობა: {arr4.length}</li>
        {arr4.map((obj, i) => {
          return (
            <li
              key={obj.id}
              style={{
                textDecoration: obj.children ? "underline" : "",
                color: obj.children ? "red" : "black",
              }}
            >
             <span style={{marginRight: "10px"}}>{i + 1}{") "}</span> {obj.name}
            </li>
          );
        })}
      </ul>
    </div>
    </>

  );
}

export default App;
