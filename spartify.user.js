// ==UserScript==
// @include     http://www.spartify.com/*
// ==/UserScript==

if(!localStorage["playMusicLocally"]){
	localStorage["playMusicLocally"] = "false";
}

function updateSong(oldSong,newSong){

	var currentSong;
	var lastSong;

	if(localStorage["playMusicLocally"] == "true"){
		if(oldSong != newSong && newSong){
			location.href = newSong;
			console.log("[Spartify+] Changing song:" + newSong);
		}

		lastSong = newSong
		currentSong = document.getElementsByClassName("first")[0].getAttribute("data-uri");

	}

	setTimeout((function(arg1, arg2){
			return function(){
				updateSong(arg1,arg2);
			};
		}(lastSong,currentSong))
	, 1000);

}

function isMaster(){
	var room = location.href.substr(location.href.lastIndexOf('/') + 1);
	return localStorage[room + ":master"] == "true";
}

function stringToBoolean(arg1){
	return arg1 == "true";
}

function addNewStyle(){

	var css = document.createElement("style");
	
	css.type = "text/css";
	css.innerHTML = ".first { background-color: yellow !important}";
	document.body.appendChild(css);
}

function addCheckBox(){

	var label = document.createElement("label");
	var description = document.createTextNode("Play music locally");
	var checkbox = document.createElement("input");

	checkbox.type = "checkbox";    
	checkbox.id = "playMusicLocally";     
	checkbox.style.width = "20px";

	label.appendChild(checkbox);  
	label.appendChild(description);
	label.style.position = "absolute";
	label.style.top = "0px";
	label.style.left = "0px";

	document.body.appendChild(label);

	checkbox.checked = stringToBoolean(localStorage["playMusicLocally"]);
	
	checkbox.onclick = function(){
		 localStorage["playMusicLocally"] = document.getElementById('playMusicLocally').checked;
	};

}

function updateTitle(){
	document.getElementsByClassName("go-main")[0].text = "Spartify+"
}

function LocalMain (){
	var currentSong;

	if(document.getElementsByClassName("first")[0] != undefined){
		currentSong = document.getElementsByClassName("first")[0].getAttribute("data-uri");
		updateSong("",currentSong);
	}
	else{
		setTimeout( LocalMain, 1000);
		return;
	}
	
	addNewStyle();
	addCheckBox();
	updateTitle();

}

if(!isMaster()){
LocalMain();
}
