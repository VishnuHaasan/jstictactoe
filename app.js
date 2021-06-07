let startbtn = document.getElementById("start-btn");
startbtn.addEventListener("click",startGame);
function createPlayer(name){
  return {name};
}
var p1;
var p2;
function startGame(event){
  let pre = document.getElementById("prestart");
  let after = document.getElementById("afterstart");
  let p1name = document.getElementById("p1-name").value;
  let p2name = document.getElementById("p2-name").value;
  if(p1name!="" && p2name!=""){
    p1 = createPlayer(p1name);
    p2 = createPlayer(p2name);
    pre.style.display = "none";
    after.style.display = "block";
    displayName(p1.name,p2.name);
    let res = document.getElementById("round-res");
    res.innerHTML = "Its " + p1.name + "'s turn"; 
    addingListeners();
  }
  else{
    alert("Enter names!!!");
  }
}

const Game = (() => {
  let board = [[0,0,0],[0,0,0],[0,0,0]];
  let turn = "X";
  const isValidPosition = (i,j) => {
    if(board[i][j] != 0){
      return false;
    }
    else{
      return true;
    }
  }

  const isGameover = (i,j,t) => {
    if(checkHorizontal(i,t) || checkVertical(j,t) || checkCross(i,j,t)){
      return "won";
    } 
    else if(isGameDrawn()) {
      return "draw";
    }
    else{
      return false;
    }
  }
  const checkHorizontal = (i,t) => {
    let c = 0;
    for(var j = 0;j<3;j++){
      if(board[i][j] == t)
      c++;
    }
    if(c==2)
    return true;
    else
    return false;
  }

  const checkVertical = (j,t) => {
    let c = 0;
    for(var i = 0;i<3;i++){
      if(board[i][j] == t)
      c++;
    }
    if(c==2)
    return true;
    else
    return false;
  }

  const checkCross = (i,j,t) => {
    if(i!=j && !(i==0 && j==2) && !(i==2 && j==0)){
      console.log("false");
      return false;
    }
    else{
      if(i==j){
        let c = 0;
        for(var i = 0;i<3;i++){
          if(board[i][i]==turn)
          c++;
        }
        if(c==2)
        return true;
      }
      else{
        let c = 0;
        if(board[0][2] == turn)
        c++;
        if(board[2][0] == turn)
        c++;
        if(board[1][1] == turn)
        c++;
        if(c==2)
        return true;
      }
    }
    return false;
  }
  const isGameDrawn = () => {
    let c = 0;
    for(var i = 0;i<3;i++){
      for(var j = 0;j<3;j++){
        if(board[i][j] != 0)
        c++;
      }
    }
    if(c == 8)
    return true;
    else
    return false;
  }
  const makeMove = (i,j,attr) => {
    if(isValidPosition(i,j)){
      let ise = isGameover(i,j,turn);
      if(ise){
        let pre = document.getElementById("prestart");
        let after = document.getElementById("afterstart");
        pre.style.display = "none";
        after.style.display = "none";
        let res = document.getElementById("round-res");
        if(ise == "won"){
          if(turn == "X")
          res.innerHTML = p1.name + " won the game.";
          else
          res.innerHTML = p2.name + " won the game.";
        }
        else{
          res.innerHTML = "Game is drawn";
        }
        document.getElementById("results").style.marginTop = "150px";
      }
      else {
        let box = findBox(attr);
        box.innerHTML = turn;
        board[i][j] = turn;
        let res = document.getElementById("round-res");
        if(turn == "X"){
          turn = "O";
          res.innerHTML = "Its " + p2.name + "'s turn";
        }
        else{
          turn = "X";
          res.innerHTML = "Its " + p1.name + "'s turn";
        }
      }
    }
  }
  return {makeMove};

})();
function addingListeners(){
  let list = document.getElementById("tic-container").children;
  for(var i = 0;i<list.length;i++){
    list[i].style.backgroundColor = "";
    list[i].addEventListener("click",example);
  }
}

function findBox(attr){
  let parent = document.getElementById("tic-container").children;
  for(var i = 0;i<parent.length;i++){
    if(parseInt(parent[i].getAttribute("data-attr")) == attr)
    return parent[i];
  }
}

function example(event){
  let nomber = parseInt(event.target.getAttribute("data-attr"));
  let obj = conversion(nomber);
  Game.makeMove(obj.x,obj.y,nomber);
}

function conversion(pos){
  switch(pos){
    case 1: return {x:0,y:0};
    case 2: return {x:0,y:1};
    case 3: return {x:0,y:2};
    case 4: return {x:1,y:0};
    case 5: return {x:1,y:1};
    case 6: return {x:1,y:2};
    case 7: return {x:2,y:0};
    case 8: return {x:2,y:1};
    case 9: return {x:2,y:2};
  }
}
function displayName(p1,p2){
  document.getElementById("player1").innerHTML = p1 + ": X";
  document.getElementById("player2").innerHTML = p2 + ": O";
}
document.getElementById("restart").addEventListener("click",function(){ location.reload();});