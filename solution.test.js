const { assert } = require('chai');
const loopSize = require('./solution');

class Node {
	constructor() {
		this.next = null;
	}
}

function createChain (danglerSize, loopSize) {
    const loopHead = new Node();
    let currentNode = loopHead;
    let prevNode;

    for (let i = 0; i < loopSize - 1; i++) {
        prevNode = currentNode;
        currentNode = new Node();

        prevNode.next = currentNode;
    }

    currentNode.next = loopHead;

    if (danglerSize < 1) return loopHead;

    const chainHead = new Node();
    currentNode = chainHead;

    for (let i = 0; i < danglerSize - 1; i++) {
        prevNode = currentNode;
        currentNode = new Node();

        prevNode.next = currentNode;
    }

    currentNode.next = loopHead;
    
    return chainHead;
}

describe("Tests", () => {
  
  it("Single node in a loop", () => {
  
    let list = createChain(0, 1);
    let result = loopSize(list);
    assert.strictEqual(result, 1);
  
  });
  
  it("List of 8801 nodes with a loop of length 23", () => {
    let list = createChain(8778, 23);
    let result = loopSize(list);
    assert.strictEqual(result, 23);
  });
  
  it("List of 8801 nodes with a loop of length 8778", () => {
    let list = createChain(23, 8778);
    let result = loopSize(list);
    assert.strictEqual(result, 8778);
  });
  
  it("Random tests", () => {
    
    for(let i = 0 ; i < 100; i ++){
      let a = Math.floor(Math.random()*10000) + 10000;
      let b = Math.floor(Math.random()*10000) + 10000;
      let list = createChain(a, b);
      let result = loopSize(list)
      assert.strictEqual(result, b, `Incorrect answer for a list of ${a+b} nodes with a loop of length ${b}`);
    }
  });
});