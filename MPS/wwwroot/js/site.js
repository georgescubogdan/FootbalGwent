﻿// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
var players = [];
var connection;
var playersToSelect = 11;
var functionalitiesToSelect = 5;
var leadersToSelect = 1;
var nextLevel = 0;
var cardToPut = null;
var receivedPlayers = [
    {
        image: "https://placehold.it/200x200",
        name: "Player Name",
        country: "Wonderland",
        fc: "FC Best",
        attack: 6,
        defense: 4
    },
    {
        image: "https://placehold.it/200x200",
        name: "Player Name",
        country: "Wonderland",
        fc: "FC Best",
        attack: 6,
        defense: 4
    },
    {
        image: "https://placehold.it/200x200",
        name: "Player Name",
        country: "Wonderland",
        fc: "FC Best",
        attack: 6,
        defense: 4
    },
    {
        image: "https://placehold.it/200x200",
        name: "Player Name",
        country: "Wonderland",
        fc: "FC Best",
        attack: 6,
        defense: 4
    },
    {
        image: "https://placehold.it/200x200",
        name: "Player Name",
        country: "Wonderland",
        fc: "FC Best",
        attack: 6,
        defense: 4
    },
    {
        image: "https://placehold.it/200x200",
        name: "Player Name",
        country: "Wonderland",
        fc: "FC Best",
        attack: 6,
        defense: 4
    },
    {
        image: "https://placehold.it/200x200",
        name: "Player Name",
        country: "Wonderland",
        fc: "FC Best",
        attack: 6,
        defense: 4
    },
    {
        image: "https://placehold.it/200x200",
        name: "Player Name",
        country: "Wonderland",
        fc: "FC Best",
        attack: 6,
        defense: 4
    },
    {
        image: "https://placehold.it/200x200",
        name: "Player Name",
        country: "Wonderland",
        fc: "FC Best",
        attack: 6,
        defense: 4
    },
    {
        image: "https://placehold.it/200x200",
        name: "Player Name",
        country: "Wonderland",
        fc: "FC Best",
        attack: 6,
        defense: 4
    },
    {
        image: "https://placehold.it/200x200",
        name: "Player Name",
        country: "Wonderland",
        fc: "FC Best",
        attack: 6,
        defense: 4
    },
    {
        image: "https://placehold.it/200x200",
        name: "Player Name",
        country: "Wonderland",
        fc: "FC Best",
        attack: 6,
        defense: 4
    },
    {
        image: "https://placehold.it/200x200",
        name: "Player Name",
        country: "Wonderland",
        fc: "FC Best",
        attack: 6,
        defense: 4
    },
    {
        image: "https://placehold.it/200x200",
        name: "Player Name",
        country: "Wonderland",
        fc: "FC Best",
        attack: 6,
        defense: 4
    },
    {
        image: "https://placehold.it/200x200",
        name: "Player Name",
        country: "Wonderland",
        fc: "FC Best",
        attack: 6,
        defense: 4
    },
    {
        image: "https://placehold.it/200x200",
        name: "Player Name",
        country: "Wonderland",
        fc: "FC Best",
        attack: 6,
        defense: 4
    },
    {
        image: "https://placehold.it/200x200",
        name: "Player Name",
        country: "Wonderland",
        fc: "FC Best",
        attack: 6,
        defense: 4
    },
    {
        image: "https://placehold.it/200x200",
        name: "Player Name",
        country: "Wonderland",
        fc: "FC Best",
        attack: 6,
        defense: 4
    },
    {
        image: "https://placehold.it/200x200",
        name: "Player Name",
        country: "Wonderland",
        fc: "FC Best",
        attack: 6,
        defense: 4
    },
    {
        image: "https://placehold.it/200x200",
        name: "Player Name",
        country: "Wonderland",
        fc: "FC Best",
        attack: 6,
        defense: 4
    },
    {
        image: "https://placehold.it/200x200",
        name: "Player Name",
        country: "Wonderland",
        fc: "FC Best",
        attack: 6,
        defense: 4
    },
    {
        image: "https://placehold.it/200x200",
        name: "Player Name",
        country: "Wonderland",
        fc: "FC Best",
        attack: 6,
        defense: 4
    },
    {
        image: "https://placehold.it/200x200",
        name: "Player Name",
        country: "Wonderland",
        fc: "FC Best",
        attack: 6,
        defense: 4
    },
    {
        image: "https://placehold.it/200x200",
        name: "Player Name",
        country: "Wonderland",
        fc: "FC Best",
        attack: 6,
        defense: 4
    },
    {
        image: "https://placehold.it/200x200",
        name: "Player Name",
        country: "Wonderland",
        fc: "FC Best",
        attack: 6,
        defense: 4
    }
]
var receivedFunctionalities = [
    {
        image: "https://placehold.it/200x200",
        name: "Functionality name",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil perspiciatis ipsum quos non delectus iure vitae cumque inventore autem assumenda, aperiam magnam architecto suscipit blanditiis facere modi aut id ea."
    },
    {
        image: "https://placehold.it/200x200",
        name: "Functionality name",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil perspiciatis ipsum quos non delectus iure vitae cumque inventore autem assumenda, aperiam magnam architecto suscipit blanditiis facere modi aut id ea."
    },
    {
        image: "https://placehold.it/200x200",
        name: "Functionality name",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil perspiciatis ipsum quos non delectus iure vitae cumque inventore autem assumenda, aperiam magnam architecto suscipit blanditiis facere modi aut id ea."
    },
    {
        image: "https://placehold.it/200x200",
        name: "Functionality name",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil perspiciatis ipsum quos non delectus iure vitae cumque inventore autem assumenda, aperiam magnam architecto suscipit blanditiis facere modi aut id ea."
    },
    {
        image: "https://placehold.it/200x200",
        name: "Functionality name",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil perspiciatis ipsum quos non delectus iure vitae cumque inventore autem assumenda, aperiam magnam architecto suscipit blanditiis facere modi aut id ea."
    },
    {
        image: "https://placehold.it/200x200",
        name: "Functionality name",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil perspiciatis ipsum quos non delectus iure vitae cumque inventore autem assumenda, aperiam magnam architecto suscipit blanditiis facere modi aut id ea."
    },
    {
        image: "https://placehold.it/200x200",
        name: "Functionality name",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil perspiciatis ipsum quos non delectus iure vitae cumque inventore autem assumenda, aperiam magnam architecto suscipit blanditiis facere modi aut id ea."
    },
    {
        image: "https://placehold.it/200x200",
        name: "Functionality name",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil perspiciatis ipsum quos non delectus iure vitae cumque inventore autem assumenda, aperiam magnam architecto suscipit blanditiis facere modi aut id ea."
    },
    {
        image: "https://placehold.it/200x200",
        name: "Functionality name",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil perspiciatis ipsum quos non delectus iure vitae cumque inventore autem assumenda, aperiam magnam architecto suscipit blanditiis facere modi aut id ea."
    },
    {
        image: "https://placehold.it/200x200",
        name: "Functionality name",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil perspiciatis ipsum quos non delectus iure vitae cumque inventore autem assumenda, aperiam magnam architecto suscipit blanditiis facere modi aut id ea."
    }
]
var receivedLeaders = [
    {
        image: "https://placehold.it/200x200",
        name: "Leader Name",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. In soluta repudiandae odio, provident quod hic harum delectus, sunt voluptatem architecto atque, expedita labore alias sequi."
    },
    {
        image: "https://placehold.it/200x200",
        name: "Leader Name",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. In soluta repudiandae odio, provident quod hic harum delectus, sunt voluptatem architecto atque, expedita labore alias sequi."
    },
    {
        image: "https://placehold.it/200x200",
        name: "Leader Name",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. In soluta repudiandae odio, provident quod hic harum delectus, sunt voluptatem architecto atque, expedita labore alias sequi."
    },
    {
        image: "https://placehold.it/200x200",
        name: "Leader Name",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. In soluta repudiandae odio, provident quod hic harum delectus, sunt voluptatem architecto atque, expedita labore alias sequi."
    },
    {
        image: "https://placehold.it/200x200",
        name: "Leader Name",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. In soluta repudiandae odio, provident quod hic harum delectus, sunt voluptatem architecto atque, expedita labore alias sequi."
    },
    {
        image: "https://placehold.it/200x200",
        name: "Leader Name",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. In soluta repudiandae odio, provident quod hic harum delectus, sunt voluptatem architecto atque, expedita labore alias sequi."
    }
]

window.onload = function () {
    //canv = document.getElementById("gc");
    //ctx = canv.getContext("2d");
    //document.addEventListener("keydown", keyPush);
    var g = new game();
    g.init;
    //map = new Map();
    //snake = new Snake();
    //apple = new Apple(15, 15);

    connection = new WebSocketManager.Connection("ws://localhost:5000/server");

    //connection.connectionMethods.onConnected = () => {
    //    snake.id = connection.connectionId;
    //    connection.invoke("ConnectedSnake", connection.connectionId, JSON.stringify(snake));

    //}

    //connection.connectionMethods.onDisconnected = () => {
    //    connection.invoke("DisconnectedSnake", connection.connectionId, "");
    //}

    //connection.clientMethods["pingSnakes"] = (sersnakes) => {
    //    snakes = JSON.parse(sersnakes);
    //    console.log(snakes);
    //};

    //connection.start();
   
    //$(window).on("unload", function (e) {
    //    connection.invoke("DisconnectedSnake", connection.connectionId, "");
    //});


    //TODO: create update function that notifies the server of the client changes
    // this function gets called every .5 seconds
    //setInterval(update, 500);
}


function Player() {
    this.id = "";
    
}


function game() {
    this.modal = document.querySelector(".modal");
    this.startBtn = document.querySelector("#startButton");
    this.modalTitle = document.querySelector(".modal-title");
    this.infoBox = document.querySelector(".info-box");
    this.clickedCard = document.querySelector(".me .clicked-card");
    this.startBtn.onclick = () => this.start();
    this.nextBtn = document.querySelector("#nextButton");
    this.nextBtn.onclick = () => this.next();
    this.modalContent = document.querySelector(".select-items");
    this.generatePlayers(receivedPlayers);
    const generatedPlayers = document.querySelectorAll(".select-items .player");

    this.asignClicks(generatedPlayers, "selected-player", "players");

    this.myAttackLine = document.querySelector(".field .me .attack-line");
    this.myMiddleLine = document.querySelector(".field .me .middle-line");
    this.myDefenseLine = document.querySelector(".field .me .defense-line");
    this.myGoalkeeperLine = document.querySelector(".field .me .goalkeeper-line");

    this.myAttackLineScore = document.querySelector(".field .me .attack-line .line-score");
    this.myMiddleLineScore = document.querySelector(".field .me .middle-line .line-score");
    this.myDefenseLineScore = document.querySelector(".field .me .defense-line .line-score");
    this.myGoalkeeperLineScore = document.querySelector(".field .me .goalkeeper-line .line-score");

    this.myAttackLine.onclick = () => this.putClickedCardOnField(this.myAttackLine);
    this.myMiddleLine.onclick = () => this.putClickedCardOnField(this.myMiddleLine);
    this.myDefenseLine.onclick = () => this.putClickedCardOnField(this.myDefenseLine);
    this.myGoalkeeperLine.onclick = () => this.putClickedCardOnField(this.myGoalkeeperLine);

    //if (connection.socket.readyState == 1) {
    //    connection.invoke("OnMove", connection.connectionId, JSON.stringify(snake));
    //}
    window.onclick = (e) => {
        if (e.target == this.modal) {
            this.modal.classList.remove("modal-active");
        }
    }
}

game.prototype.init = function () {
   
    console.log(this.myAttackLine);
    console.log(this.myMiddleLine);
    console.log(this.myDefenseLine);
    console.log(this.myGoalkeeperLine);


    window.onclick = (e) => {
      if (e.target == this.modal) {
        this.modal.classList.remove("modal-active");
      }
    }
}

game.prototype.asignClicks = function (arr, activeItemClass, itemsName) {
    arr.forEach(item => {
        item.onclick = () => {
            if (item.classList.contains(activeItemClass)) {
                item.classList.remove(activeItemClass);
                this[`${itemsName}ToSelect`]++;
                this.infoBox.innerHTML = `${itemsName} to select:<br>${this[`${itemsName}ToSelect`]}`;
            } else {
                if (this[`${itemsName}ToSelect`] > 0) {
                    item.classList.add(activeItemClass);
                    this[`${itemsName}ToSelect`]--;
                    this.infoBox.innerHTML = `${itemsName} to select:<br>${this[`${itemsName}ToSelect`]}`;
                } else {
                    alert(`You have already selected all ${itemsName}. Press "Next" to continue.`);
                }
            }
        }
    })
}

game.prototype.start = function () {
    this.startBtn.style.display = "none";
    this.modal.classList.add("modal-active");
    this.infoBox.innerHTML = `Players to select:<br>11`;
}

game.prototype.next = function () {
    if (this.nextLevel === 0) {
        if (this.playersToSelect > 0) {
            alert(`Please, select ${this.playersToSelect} more players`);
        } else {
            this.selectedPlayers = document.querySelectorAll(".selected-player");
            this.nextLevel++;
            this.modalTitle.innerHTML = "Select functionalities";
            this.infoBox.innerHTML = `Functionalities to select:<br>5`;
            this.generateFunctionalities(receivedFunctionalities);
            const generatedFunctionalities = document.querySelectorAll(".select-items .functionality");
            this.asignClicks(generatedFunctionalities, "selected-functionality", "functionalities");
        }
    } else if (this.nextLevel === 1) {
        if (this.functionalitiesToSelect > 0) {
            alert(`Please, select ${this.functionalitiesToSelect} more functionalities`);
        } else {
            this.selectedFunctionalities = document.querySelectorAll(".selected-functionality");
            this.nextLevel++;
            this.nextBtn.innerHTML = "Start";
            this.modalTitle.innerHTML = "Select leader";
            this.infoBox.innerHTML = `Leader to select:<br>1`;
            this.generateLeaders(receivedLeaders);
            const generatedLeaders = document.querySelectorAll(".select-items .leader");
            this.asignClicks(generatedLeaders, "selected-leader", "leaders");
        }
    } else if (this.nextLevel === 2) {
        this.selectedLeader = document.querySelector(".selected-leader");
        this.modal.classList.remove("modal-active");
        this.nextBtn.innerHTML = "Next";
        console.log(this.selectedPlayers);
        console.log(this.selectedFunctionalities);
        console.log(this.selectedLeader);
        this.putMySelectedCards();
    }
}

game.prototype.putClickedCardOnField = function (line) {
    cardsPlace = line.querySelector(".cards-place");
    score = line.querySelector(".line-score");
    let newScore = 0;
    if (this.cardToPut) {
        cardsPlace.appendChild(this.cardToPut);
        this.cardToPut.onclick = () => this.showClickedCard(this.cardToPut);
        this.cardToPut = null;
        this.clickedCard.innerHTML = "";

        const players = line.querySelectorAll(".player");
        players.forEach(item => {
            item.onclick = () => this.showClickedCard(item);
            console.log(item.querySelector(".attack"));
            console.log(item.querySelector(".defense"));
            console.log(item.querySelector(".attack span"));
            console.log(item.querySelector(".defense span"));
            att = Number(item.querySelector(".attack span").innerHTML);
            def = Number(item.querySelector(".defense span").innerHTML);
            newScore += att + def;
        });
        score.innerHTML = newScore;

        const functionalities = line.querySelectorAll(".functionality");
        functionalities.forEach(item => item.onclick = () => this.showClickedCard(item));

        if ((players.length + functionalities.length) > 8) {
            cardsPlace.style.justifyContent = "flex-start";
        }
    }
}

game.prototype.showClickedCard = function (item) {
    this.clickedCard.innerHTML = "";
    newItem = item.cloneNode(true);
    this.clickedCard.appendChild(newItem);
}

game.prototype.putClickedCard = function (item) {
    this.showClickedCard(item);
    this.cardToPut = item;
}

game.prototype.putMySelectedCards = function () {
    this.leaderPlace = document.querySelector(".info .me .leader-place");
    this.cardsPlace = document.querySelector(".info .me .cards-place");

    this.selectedLeader.classList.remove("selected-leader");
    this.leaderPlace.appendChild(this.selectedLeader);

    this.selectedFunctionalities.forEach(item => {
        item.onclick = () => this.putClickedCard(item);
        item.classList.remove("selected-functionality");
        this.cardsPlace.appendChild(item);
    });
    this.selectedPlayers.forEach(item => {
        item.onclick = () => this.putClickedCard(item);
        item.classList.remove("selected-player");
        this.cardsPlace.appendChild(item);
    });
}

game.prototype.generateLeaders = function (arr) {
    const { modalContent: leaders } = this;
    leaders.innerHTML = "";
    arr.forEach(item => {
        leaders.innerHTML += `
      <div class="leader">
        <div class="photo">
          <img src=${item.image} alt="leader photo">
        </div>
        <div class="information">
          <div class="name">
            ${item.name}
          </div>
          <div class="description">
            ${item.description}
          </div>
        </div>
      </div>
      `
    })
}

game.prototype.generateFunctionalities = function (arr) {
    const { modalContent: functionalities } = this;
    functionalities.innerHTML = "";
    arr.forEach(item => {
        functionalities.innerHTML += `
      <div class="functionality">
        <div class="photo">
          <img src=${item.image} alt="functionality photo">
        </div>
        <div class="information">
          <div class="name">
            ${item.name}
          </div>
          <div class="description">
            ${item.description}
          </div>
        </div>

      </div>
      `
    })
}

game.prototype.generatePlayers = function (arr) {
    const { modalContent: players } = this;
    players.innerHTML = "";
    arr.forEach(item => {
        players.innerHTML += `
      <div class="player">
        <div class="photo">
          <img src=${item.image} alt="player photo">
        </div>
        <div class="information">
          <div class="name">
            ${item.name}
          </div>
          <div class="country">
            ${item.country}
          </div>
          <div class="fc">
            ${item.fc}
          </div>
          <div class="stats">
            <div class="attack">
              <span>${item.attack}</span>
            </div>
            <div class="defense">
              <span>${item.defense}</span>
            </div>
          </div>
        </div>
      </div>
      `;
    })
}


function keyPush(evt) {
    switch (evt.keyCode) {
        case 37:
            snake.xvel = -1; snake.yvel = 0;
            break;
        case 38:
            snake.xvel = 0; snake.yvel = -1;
            break;
        case 39:
            snake.xvel = 1; snake.yvel = 0;
            break;
        case 40:
            snake.xvel = 0; snake.yvel = 1;
            break;
    }
}