import { useEffect, useState } from "react";
import copy from 'copy-to-clipboard';


// Datas
import { data } from "./data.js";
import foodmartData from "./foodmart.json"
import gdmData from "./gdm.json"
import pepsiData from "./pepsi.json"
import deilyData from "./deily.json"

// CSS
import "./App.css";

import createTree from "./utils/createTree.js";

const resArr = createTree(foodmartData)

console.log(resArr)

function App() {
  const [arr1, setArr1] = useState(resArr);
  const [arr2, setArr2] = useState([]);
  const [arr3, setArr3] = useState([]);
  const [arr4, setArr4] = useState([]);
  const [arr5, setArr5] = useState([]);

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
    <div className="App">
      {/* <pre> {JSON.stringify(levelOneArr, null, 2)}</pre> */}
      <ul className="arr1-ul">
        <li>რაოდენობა: {arr1.length}</li>
        {arr1.map((obj) => {
          return (
            <li
              onClick={() => setArr2Ul(obj)}
              key={obj.id}
              style={{
                textDecoration: obj.children ? "underline" : "",
                color: obj.children ? "red" : "black",
              }}
            >
              {obj.name}
            </li>
          );
        })}
      </ul>
      <ul className="arr2-ul">
      <li>რაოდენობა: {arr2.length}</li>

        {arr2.map((obj) => {
          return (
            <li
              onClick={() => setArr3Ul(obj)}
              key={obj.id}
              style={{
                textDecoration: obj.children ? "underline" : "",
                color: obj.children ? "red" : "black",
              }}
            >
              {obj.name}
            </li>
          );
        })}
      </ul>
      <ul className="arr3-ul">
      <li>რაოდენობა: {arr3.length}</li>

        {arr3.map((obj) => {
          return (
            <li
              onClick={() => setArr4Ul(obj)}
              key={obj.id}
              style={{
                textDecoration: obj.children ? "underline" : "",
                color: obj.children ? "red" : "black",
              }}
            >
              {obj.name}
            </li>
          );
        })}
      </ul>
      <ul className="arr4-ul">
      <li>რაოდენობა: {arr4.length}</li>
        {arr4.map((obj) => {
          return (
            <li
              key={obj.id}
              style={{
                textDecoration: obj.children ? "underline" : "",
                color: obj.children ? "red" : "black",
              }}
            >
              {obj.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
