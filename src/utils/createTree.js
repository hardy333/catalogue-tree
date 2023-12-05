const createTree = (fromData) => {
  let startData = fromData;
  // let startData = foodmartData
  // let startData = gdmData
  // let startData = pepsiData

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

  return levelOneArr;
};

export default createTree;
