class Node {
  constructor(
    val = floor(random(100)),
    x = random(width / 2),
    y = random(height / 2),
    wd = 1000
  ) {
    this.x = x;
    this.y = y;
    this.val = val;
    this.wd = wd;
    this.color = [];
    this.parent = null;
    this.rchild = null;
    this.lchild = null;
  }

  show() {
    push();
    stroke(133, 153, 0);
    strokeWeight(4);
    noFill();
    if (this.rchild != null) {
      this.rchild.setPosition(this.x + this.wd / 2, this.y + 100, this.wd / 2);
      bezier(
        this.x,
        this.y,
        this.x,
        this.rchild.y,
        this.rchild.x,
        this.y,
        this.rchild.x,
        this.rchild.y
      );
      this.rchild.show();
    }
    if (this.lchild != null) {
      this.lchild.setPosition(this.x - this.wd / 2, this.y + 100, this.wd / 2);
      bezier(
        this.x,
        this.y,
        this.x,
        this.lchild.y,
        this.lchild.x,
        this.y,
        this.lchild.x,
        this.lchild.y
      );
      this.lchild.show();
    }
    pop();

    push();
    //---------rect---------
    stroke(100);
    strokeWeight(3);
    fill(68, 5, 97);
    rectMode(CENTER);
    rect(this.x, this.y, 80, 50, 10);
    //---------text---------
    fill(100);
    strokeWeight(1);
    textAlign(CENTER);
    textSize(25);
    text(this.val, this.x, this.y + 5);
    pop();
  }

  getPosition(x, y) {
    return [this.x, this.y];
  }

  setPosition(x = this.x, y = this.y, wd = this.wd) {
    this.wd = wd;
    this.x = x;
    this.y = y;
  }

  hilight() {
    push();
    stroke(42, 161, 152);
    strokeWeight(4);
    noFill();
    rectMode(CENTER);
    rect(this.x, this.y, 80, 50, 10);
    pop();
  }
}

//-----------------------------------------------------------------------------------------------------------------

// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }
function delay(func, ms) {
  const start = millis();
  while (millis() - start < ms) {
    func();
  }
}

function addNode(val, root) {
  while (root != null) {
    root.hilight();
    if (root.val > val) {
      if (root.lchild != null) {
        root = root.lchild;
      } else {
        root.lchild = new Node(val);
        return;
      }
    } else {
      if (root.rchild != null) {
        root = root.rchild;
      } else {
        root.rchild = new Node((val = val));
        return;
      }
    }
  }
}

function deleteNode(val, root) {
  if (root == null) return null;
  if (val < root.val) {
    root.lchild = deleteNode(val, root.lchild);
  } else if (val > root.val) {
    root.rchild = deleteNode(val, root.rchild);
  } else {
    // Node to delete found

    // Case 1: No children

    if (root.lchild == null && root.rchild == null) {
      return null;
    }

    // Case 2: Only one child
    if (root.lchild == null) return root.rchild;
    if (root.rchild == null) return root.lchild;

    // Case 3: Two children – find in-order successor
    let minNode = getMin(root.rchild);
    root.val = minNode.val;
    root.rchild = deleteNode(minNode.val, root.rchild);
  }

  return root;
}

function getMin(node) {
  while (node.lchild != null) {
    node = node.lchild;
  }
  return node;
}

let N = [];
let root;

let addIP, addBTN;
let deleteIP, deleteBTN;
let searchIP, searchBTN;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(20);
  root = new Node();
  root.setPosition(width / 2, 50, width / 2);

  addIP = createInput();
  addIP.position(40, 0);
  addBTN = createButton("Add");
  addBTN.position(0, 0);
  deleteIP = createInput();
  deleteIP.position(60, 30);
  deleteBTN = createButton("Delete");
  deleteBTN.position(0, 30);

  root.show();
  addBTN.mousePressed(function () {
    // if (addIP.value() == "") {
    //   return;
    // }
    // addNode(addIP.value(), root);
    addNode(floor(random(100)), root);
    background(20);
    // root.show();
    addIP.value("");
  });

  deleteBTN.mousePressed(function () {
    if (deleteIP.value() == "") {
      return;
    }
    deleteNode(int(deleteIP.value()), root);
    deleteIP.value("");
  });
}

function draw() {
  background(20);
  root.show();
}
