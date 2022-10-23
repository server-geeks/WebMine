var arr=["images/dice1.png","images/dice2.png","images/dice3.png","images/dice4.png","images/dice5.png","images/dice6.png"];

var r1=Math.random()*6;
var r2=Math.random()*6;

r1=Math.floor(r1) +1;
r2=Math.floor(r2) +1;

document.querySelector(".first").setAttribute("src",arr[r1-1]);
document.querySelector(".second").setAttribute("src",arr[r2-1]);

if(r1>r2)
document.querySelector("h1").innerHTML="🚩Player 1 Wins";

else if(r2>r1)
document.querySelector("h1").innerHTML="Player 2 Wins🚩";

else
document.querySelector("h1").innerHTML="Draw";
