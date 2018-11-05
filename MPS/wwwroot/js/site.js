// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
let receivedPlayers = []
let receivedFunctionalities = []
let receivedLeaders = []
let pass = false;
var player;
var players = [];

const game = {
    playersToSelect: 11,
    functionalitiesToSelect: 5,
    leadersToSelect: 1,
    nextLevel: 0,
    cardToPut: null,
    init() {
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

        this.myAttackLineScore = document.querySelector(".field .me .attack-line .line-score span");
        this.myMiddleLineScore = document.querySelector(".field .me .middle-line .line-score span");
        this.myDefenseLineScore = document.querySelector(".field .me .defense-line .line-score span");
        this.myGoalkeeperLineScore = document.querySelector(".field .me .goalkeeper-line .line-score span");

        this.myAttackLine.onclick = () => this.putClickedCardOnField(this.myAttackLine);
        this.myMiddleLine.onclick = () => this.putClickedCardOnField(this.myMiddleLine);
        this.myDefenseLine.onclick = () => this.putClickedCardOnField(this.myDefenseLine);
        this.myGoalkeeperLine.onclick = () => this.putClickedCardOnField(this.myGoalkeeperLine);

        this.enemyAttackLine = document.querySelector(".field .enemy .attack-line");
        this.enemyMiddleLine = document.querySelector(".field .enemy .middle-line");
        this.enemyDefenseLine = document.querySelector(".field .enemy .defense-line");
        this.enemyGoalkeeperLine = document.querySelector(".field .enemy .goalkeeper-line");

        this.enemyAttackLineScore = document.querySelector(".field .enemy .attack-line .line-score span");
        this.enemyMiddleLineScore = document.querySelector(".field .enemy .middle-line .line-score span");
        this.enemyDefenseLineScore = document.querySelector(".field .enemy .defense-line .line-score span");
        this.enemyGoalkeeperLineScore = document.querySelector(".field .enemy .goalkeeper-line .line-score span");

        this.passBtn = document.querySelector("#pass");
    },

    asignClicks(arr, activeItemClass, itemsName) {
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
    },

    start() {
        this.startBtn.style.display = "none";
        this.modal.classList.add("modal-active");
        this.infoBox.innerHTML = `Players to select:<br>11`;
    },

    next() {
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
    },

    putClickedCardOnField(line) {
        cardsPlace = line.querySelector(".cards-place");
        score = line.querySelector(".line-score span");
        let newScore = 0;
        if ((this.cardToPut
                && players.find(p => p.id === player.id).turn === true
                && players.find(p => p.id === player.id).pass === false && pass === false)
            || (this.cardToPut
                && players.find(p => p.id === player.id).opponentPass === true
                && players.find(p => p.id === player.id).pass === false && pass === false)) {
            cardsPlace.appendChild(this.cardToPut);
            this.cardToPut.onclick = () => this.showClickedCard(this.cardToPut);
            player.cards = this.sendCardsFromField();
            this.cardToPut = null;
            this.clickedCard.innerHTML = "";

            const players = line.querySelectorAll(".player");
            players.forEach(item => {
                item.onclick = () => this.showClickedCard(item);
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
            this.updateTurn();
        } else if (players.find(p => p.id === player.id).pass === true) {
            alert("You passed bro! Wait for the other to finish!");
        } else {
            console.log(players);
            alert("Not your turn, bro!");
        }
    },

    updateTurn() {
        //console.log("update");
        //console.log(players);
        let thisPlayer = players.find(p => p.id === player.id);
        thisPlayer.turn = !thisPlayer.turn;
        let other = players.find(p => p.id !== player.id);
        other.turn = !other.turn;
        players = [thisPlayer, other];
        console.log(player.id);
        update();
        //players.forEach(p => { p.turn = !p.turn });
        //console.log(players);
    },

    showClickedCard(item) {
        this.clickedCard.innerHTML = "";
        newItem = item.cloneNode(true);
        this.clickedCard.appendChild(newItem);
    },

    putClickedCard(item) {
        this.showClickedCard(item);
        this.cardToPut = item;
    },

    putMySelectedCards() {
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
    },

    generateLeaders(arr) {
        const { modalContent: leaders } = this;
        leaders.innerHTML = "";
        arr.forEach(item => {
            leaders.innerHTML += `
      <div class="card leader">
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
    },

    generateFunctionalities(arr) {
        const { modalContent: functionalities } = this;
        functionalities.innerHTML = "";
        arr.forEach(item => {
            functionalities.innerHTML += `
      <div class="card functionality">
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
    },

    generatePlayers(arr) {
        //console.log(this.modalContent);
        const { modalContent: players } = this;
        players.innerHTML = "";
        arr.forEach(item => {
            players.innerHTML += `
      <div class="card player">
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
          <div class="tip">
            ${item.tip}
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
    },

    sendCoach() {
        coachDiv = document.querySelector(".info .me .leader");

        if (coachDiv) {
            return this.generateCoachObj(coachDiv);
        } else {
            return null;
        }

    },

    sendCardsFromField() {
        const cards = [];

        line4 = this.myAttackLine.querySelectorAll(".card");
        line3 = this.myMiddleLine.querySelectorAll(".card");
        line2 = this.myDefenseLine.querySelectorAll(".card");
        line1 = this.myGoalkeeperLine.querySelectorAll(".card");

        line4.forEach(item => {
            let card;
            if (item.classList.contains("player")) {
                card = this.generatePlayerobj(item, 4);
            } else {
                card = this.generateFunctionalityObj(item, 4);
            }
            cards.push(card);
        });

        line3.forEach(item => {
            let card;
            if (item.classList.contains("player")) {
                card = this.generatePlayerobj(item, 3);
            } else {
                card = this.generateFunctionalityObj(item, 3);
            }
            cards.push(card);
        });

        line2.forEach(item => {
            let card;
            if (item.classList.contains("player")) {
                card = this.generatePlayerobj(item, 2);
            } else {
                card = this.generateFunctionalityObj(item, 2);
            }
            cards.push(card);
        });

        line1.forEach(item => {
            let card;
            if (item.classList.contains("player")) {
                card = this.generatePlayerobj(item, 1);
            } else {
                card = this.generateFunctionalityObj(item, 1);
            }
            cards.push(card);
        });

        //console.log("players");

        //console.log(cards);

        return cards;
    },

    generateCoachObj(div) {
        const c = new Coach();

        c.image = div.querySelector(".photo img").src;
        c.name = div.querySelector(".name").innerHTML;
        c.description = div.querySelector(".description").innerHTML;;
        c.active = 0;
        c.passive = 0;
        c.descpassive = "";
        c.descactive = "";

        return c;
    },

    generatePlayerobj(div, pos) {
        const c = new Card();

        c.image = div.querySelector(".photo img").src;
        c.name = div.querySelector(".name").innerHTML;
        c.attack = Number(div.querySelector(".attack span").innerHTML);
        c.defense = Number(div.querySelector(".defense span").innerHTML);
        c.fc = div.querySelector(".fc").innerHTML;
        c.country = div.querySelector(".country").innerHTML;
        c.tip = Number(div.querySelector(".tip").innerHTML);
        c.pos = pos;

        return c;
    },

    generateFunctionalityObj(div, pos) {
        const p = new Power();

        p.image = div.querySelector(".photo img").src;
        p.name = div.querySelector(".name").innerHTML;
        p.description = div.querySelector(".description").innerHTML;
        p.tip = 1;
        p.pos = pos;

        applyPower(p);

        return p;
    },

    generatePlayerCardFromObj(obj) {
        const player = document.createElement("div");
        player.classList.add("card", "player");
        player.innerHTML = `
        <div class="photo">
          <img src=${obj.image} alt="player photo">
        </div>
        <div class="information">
          <div class="name">
            ${obj.name}
          </div>
          <div class="country">
            ${obj.country}
          </div>
          <div class="fc">
            ${obj.fc}
          </div>
          <div class="tip">
            ${obj.tip}
          </div>
          <div class="stats">
            <div class="attack">
              <span>${obj.attack}</span>
            </div>
            <div class="defense">
              <span>${obj.defense}</span>
            </div>
          </div>
        </div>
        `;
        player.onclick = () => this.showClickedCard(player);

        return player;
    },

    generateFunctionalityCardFromObj(obj) {
        const func = document.createElement("div");
        func.classList.add("card", "functionality");
        func.innerHTML = `
        <div class="photo">
          <img src=${obj.image} alt="functionality photo">
        </div>
        <div class="information">
          <div class="name">
            ${obj.name}
          </div>
          <div class="description">
            ${obj.description}
          </div>
        </div>
        `;
        func.onclick = () => this.showClickedCard(func);

        return func;
    },

    generateCoachCardFromObj(obj) {
        const c = document.createElement("div");
        c.classList.add("card", "leader");
        c.innerHTML = `
        <div class="photo">
          <img src=${obj.image} alt="leader photo">
        </div>
        <div class="information">
          <div class="name">
            ${obj.name}
          </div>
          <div class="description">
            ${obj.description}
          </div>
        </div>
        `;

        return c;
    },

    putOnFieldByPos(attDiv, midDiv, defDiv, gkDiv, pos, cardDiv) {
        if (pos === 1) {
            gkDiv.appendChild(cardDiv);
        } else if (pos === 2) {
            defDiv.appendChild(cardDiv);
        } else if (pos === 3) {
            midDiv.appendChild(cardDiv);
        } else {
            attDiv.appendChild(cardDiv);
        }
    },

    updateScoreOnLine(attLine, midLine, defLine, gkLine, pos) {
        let line;
        if (pos === 1) {
            line = gkLine;
        } else if (pos === 2) {
            line = defLine;
        } else if (pos === 3) {
            line = midLine;
        } else {
            line = attLine;
        }

        cardsPlace = line.querySelector(".cards-place");
        score = line.querySelector(".line-score span");
        let newScore = 0;

        const playerDivs = line.querySelectorAll(".player");
        playerDivs.forEach(item => {
            const att = Number(item.querySelector(".attack span").innerHTML);
            const def = Number(item.querySelector(".defense span").innerHTML);
            newScore += att + def;
        });
        score.innerHTML = newScore;

        const functionalityDivs = line.querySelectorAll(".functionality");
        if ((playerDivs.length + functionalityDivs.length) > 8) {
            cardsPlace.style.justifyContent = "flex-start";
        }
    },

    generateCoachFromBlob(info, currPlayerId) {
        info.forEach(player => {
            if (player.id !== currPlayerId) {
                if (player.coach !== null) {
                    const enemyCoachPlace = document.querySelector(".info .enemy .leader-place");
                    if (enemyCoachPlace.innerHTML === "") {
                        const coachDiv = this.generateCoachCardFromObj(player.coach);
                        enemyCoachPlace.appendChild(coachDiv);
                    }
                }
            }
        });
    },

    generateCardsOnFieldFromBlob(info, currPlayerId) {
        this.generateCoachFromBlob(info, currPlayerId);

        info.forEach(player => {
            if (player.id === currPlayerId) {
                const { myAttackLine, myMiddleLine, myDefenseLine, myGoalkeeperLine } = this;

                myAttCardsPlace = myAttackLine.querySelector(".cards-place");
                myMidCardsPlace = myMiddleLine.querySelector(".cards-place");
                myDefCardsPlace = myDefenseLine.querySelector(".cards-place");
                myGkCardsPlace = myGoalkeeperLine.querySelector(".cards-place");

                myAttCardsPlace.innerHTML = "";
                myMidCardsPlace.innerHTML = "";
                myDefCardsPlace.innerHTML = "";
                myGkCardsPlace.innerHTML = "";

                if (player.cards.length > 0) {
                    player.cards.forEach(card => {
                        let cardDiv;
                        if (!card.fc && !card.country) {
                            cardDiv = this.generateFunctionalityCardFromObj(card);
                        } else {
                            cardDiv = this.generatePlayerCardFromObj(card);
                        }

                        this.putOnFieldByPos(myAttCardsPlace, myMidCardsPlace, myDefCardsPlace, myGkCardsPlace, card.pos, cardDiv);
                        this.updateScoreOnLine(myAttackLine, myMiddleLine, myDefenseLine, myGoalkeeperLine, card.pos);
                    });
                }

                const { enemyAttackLine, enemyMiddleLine, enemyDefenseLine, enemyGoalkeeperLine } = this;
                enemyAttCardsPlace = enemyAttackLine.querySelector(".cards-place");
                enemyMidCardsPlace = enemyMiddleLine.querySelector(".cards-place");
                enemyDefCardsPlace = enemyDefenseLine.querySelector(".cards-place");
                enemyGkCardsPlace = enemyGoalkeeperLine.querySelector(".cards-place");

                enemyAttCardsPlace.innerHTML = "";
                enemyMidCardsPlace.innerHTML = "";
                enemyDefCardsPlace.innerHTML = "";
                enemyGkCardsPlace.innerHTML = "";

                if (player.opCards.length > 0) {
                    player.opCards.forEach(card => {
                        let cardDiv;
                        if (!card.fc && !card.country) {
                            cardDiv = this.generateFunctionalityCardFromObj(card);
                        } else {
                            cardDiv = this.generatePlayerCardFromObj(card);
                        }

                        this.putOnFieldByPos(enemyAttCardsPlace, enemyMidCardsPlace, enemyDefCardsPlace, enemyGkCardsPlace, card.pos, cardDiv);
                        this.updateScoreOnLine(enemyAttackLine, enemyMiddleLine, enemyDefenseLine, enemyGoalkeeperLine, card.pos);

                    });
                }
            }
        });
    },

    //TODO implement pass button logic
    pressPass(player) {
        this.setEnemyPassed(false);
        player.pass = true;
        pass = true;
    },

    getMyTotalSum() {
        let sum = 0;

        sum += Number(this.myAttackLineScore.innerHTML) +
            Number(this.myMiddleLineScore.innerHTML) +
            Number(this.myDefenseLineScore.innerHTML) +
            Number(this.myGoalkeeperLineScore.innerHTML);
        return sum;
    },

    resetLineScores() {
        this.myAttackLineScore.innerHTML = 0;
        this.myMiddleLineScore.innerHTML = 0;
        this.myDefenseLineScore.innerHTML = 0;
        this.myGoalkeeperLineScore.innerHTML = 0;
        this.enemyAttackLineScore.innerHTML = 0;
        this.enemyMiddleLineScore.innerHTML = 0;
        this.enemyDefenseLineScore.innerHTML = 0;
        this.enemyGoalkeeperLineScore.innerHTML = 0;
    },

    getEnemyTotalSum() {
        let sum = 0;

        sum += Number(this.enemyAttackLineScore.innerHTML) +
            Number(this.enemyMiddleLineScore.innerHTML) +
            Number(this.enemyDefenseLineScore.innerHTML) +
            Number(this.enemyGoalkeeperLineScore.innerHTML);
        return sum;
    },

    //sets the round field to @nr
    setRound(nr) {
        const span = document.querySelector(".match-info .round-number span");
        span.innerHTML = nr;
    },

    setMyCurrentScore() {
        const span = document.querySelector(".match-info .my-current-score span");
        span.innerHTML = this.getMyTotalSum();
    },

    setEnemiesCurrentScore() {
        const span = document.querySelector(".match-info .enemy-current-score span");
        span.innerHTML = this.getEnemyTotalSum();
    },

    incrementMyRoundsWon() {
        const span = document.querySelector(".match-info .my-rounds-won span");
        span.innerHTML = Number(span.innerHTML) + 1;
    },

    incrementEnemiesRoundsWon() {
        const span = document.querySelector(".match-info .enemy-rounds-won span");
        span.innerHTML = Number(span.innerHTML) + 1;
    },

    setTurn(whose) {
        const span = document.querySelector(".match-info .info-for-turns span");
        if (whose === "my") {
            span.innerHTML = "your";
        } else {
            span.innerHTML = "your enemy's";
        }
    },

    setWinner(name) {
        const span = document.querySelector(".match-info .winner span");
        span.innerHTML = name;
    },

    setEnemyPassed(val) {
        const span = document.querySelector(".match-info .enemy-passed span");
        if (val === true) {
            span.innerHTML = "passed";
        } else {
            span.innerHTML = "is still playing";
        }
    }
}

window.onload = function () {
    player = new Player();
    //Card randomize section
    let cards = [];
    for (let i = 0; i < 24; i++) {
        let id = Math.floor(Math.random() * date.carte.length);
        let newCard = date.carte[id];

        while (cards.filter(c => c.name === newCard.name).length > 0) 
        {
            id = Math.floor(Math.random() * date.carte.length);
            newCard = date.carte[id];
        }
        
        newCard.image = "../images/jucatori_poze/" + (id+1) + "_jucator.jpg";
        cards.push(newCard);
    }
    receivedPlayers = cards;

    cards = [];
    for (let i = 0; i < 10; i++) {
        let id = Math.floor(Math.random() * date.power.length);
        let newCard = date.power[id];

        while (cards.filter(c => c.name === newCard.name).length > 0) {
            newCard = date.power[Math.floor(Math.random() * date.power.length)];
        }
        cards.push(newCard);
    }
    receivedFunctionalities = cards;

    cards = [];
    for (let i = 0; i < 5; i++) {
        let id = Math.floor(Math.random() * date.coach.length);
        let newCard = date.coach[id];
        while (cards.filter(c => c.name === newCard.name).length > 0) {
            newCard = date.coach[Math.floor(Math.random() * date.coach.length)];
        }
        cards.push(newCard);
    }
    receivedLeaders = cards;

    game.init();
    game.passBtn.onclick = () => game.pressPass(player);

    //Connection section
    connection = new WebSocketManager.Connection("ws://localhost:5000/server");

    connection.connectionMethods.onConnected = () => {
        player.id = connection.connectionId;
        connection.invoke("ConnectedPlayer", connection.connectionId, JSON.stringify(player));
    }

    connection.connectionMethods.onDisconnected = () => {
        connection.invoke("DisconnectedPlayer", connection.connectionId, "");
    }

    connection.clientMethods["pingPlayers"] = (serverPlayers) => {
        players = JSON.parse(serverPlayers);
        console.log("received info:");
        console.log(players);
        game.generateCardsOnFieldFromBlob(players, player.id);

    };

    connection.start();
   
    $(window).on("unload", function (e) {
        connection.invoke("DisconnectedPlayer", connection.connectionId, "");
    });


    //TODO: create update function that notifies the server of the client changes
    // this function gets called every .5 seconds
    setInterval(update, 500);
}

function checkRoundOrMatchFinish() {
    let passCount = 0;
    players.forEach(p => {
        if (!!p.pass == true) {
            passCount++;
        }
    });
    if (passCount === 2 && !player.matchFinish && pass === true) {
        //suma scoruri pentru ambii jucatori
        var mySum = game.getMyTotalSum();
        var enemySum = game.getEnemyTotalSum();
        //in functie de suma se adauga +1 la scorul jucatorului invingator
        if (mySum > enemySum) {
            player.score++;
        } else if (mySum == enemySum) {
            player.score++;
            players.find(p => p.id !== player.id).score++;
        } else {
            players.find(p => p.id !== player.id).score++;
        }
        if (player.score === 2) {
            game.setWinner("You, bro!");
            //alert("You won the match, bro!");
            player.matchFinish = true;
        } else if (players.find(p => p.id !== player.id).score === 2) {
            game.setWinner("Not you, bro!");
            //alert("You lost the match, bro!");
            player.matchFinish = true;
        } else {
            if (mySum > enemySum) {
                game.incrementMyRoundsWon();
                //alert("You won this round, bro!");
                player.turn = true;
            } else if (mySum == enemySum) {
                game.incrementMyRoundsWon();
                game.incrementEnemiesRoundsWon();
               // alert("You equaled this round, bro!");
            } else {
                //alert("You lost this round, bro!");
                game.incrementEnemiesRoundsWon();
                player.turn = false;
            }
            //TODO sa se curete boardul si sa se elimine cartile
            player.cards = [];
            player.pass = false;
            pass = false;
            player.opponentPass = false;
            update();
            game.resetLineScores();
        }
        
    }
}
//TODO change this function to permit other player updates
// ConnectionId -> otherPlayer.id; player -> otherPlayer
function update() {

    //player.cards = game.sendCardsFromField();
    //if (connection.socket.readyState == 1) {
    //    connection.invoke("Update", connection.connectionId, JSON.stringify(player));
    //}
    player.coach = game.sendCoach();
    checkRoundOrMatchFinish();
    const myTotalScore = game.getMyTotalSum();
    const enemyTotalScore = game.getEnemyTotalSum();
    game.setEnemiesCurrentScore();
    game.setMyCurrentScore();
    let totalScore = 0;
    players.forEach(p => {
        totalScore += p.score;
    });
    game.setRound(totalScore + 1);
    console.log("MY SCORE " + myTotalScore);
    console.log("ENEMY SCORE " + enemyTotalScore);

    players.forEach(p => {
        if (p.id == player.id) {
            p.cards = player.cards;
            p.coach = player.coach;
           // p.score = player.score;
           // p.roundCount = player.roundCount;
           // p.turn = player.turn;
            game.setTurn(p.turn === true ? "my" : "");

            p.pass = player.pass;
            p.opponentPass = player.opponentPass;
            let other = players.find(p => p.id !== player.id);
            p.opCards = (other) ? other.cards : [];
            p.score = player.score;

            //TODO and other update stuff
            if (connection.socket.readyState == 1) {
                connection.invoke("Update", p.id, JSON.stringify(p));
            }
        }
        
    })
}

function Player() {
    this.id = "";
    this.test = 0;
    this.cards = [];
    this.opCards = [];
    this.coach = null;
    this.turn = false;
    this.pass = false;
    this.opponentPass = false;
    this.roundCount = 0;
    this.score = 0;
    this.matchFinish = false;
}
function Card() {
    this.image = "";
    this.name = "";
    this.attack = 0;
    this.defense = 0;
    this.fc = "";
    this.country = "";
    this.tip = 0;
    this.pos = 0;
    this.description = "";

}
function Power() {
    this.image = "";
    this.name = "";
    this.description = "";
    this.tip = 0;
    this.pos = 0;
}
function Coach() {
    this.image = "";
    this.name = "";
    this.description = "";
    this.active = 0;
    this.passive = 0;
    this.descpassive = "";
    this.descactive = "";
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

function applyPower(power) {
    player.cards.forEach(c => {
        if (c.pos === 4) {
            c.attack += 3;
        }
    });
    /*
    // EXEMPLE
    //Pentru playerul care nu suntem noi se lucreaza cu players.forEach
    if (power.tip === -2) {
        players.forEach(
            p => {
                if (p.id !== connection.connectionId) {
                    p.cards.forEach(c => {
                        if (c.pos === 4) {
                            c.attack -= 3;
                        }
                    });
                }
            });
    }
    //Pentru playerul curent se lucreaza cu player
    if (power.tip === -1) {
        player.cards.forEach(c => {
            if (c.pos === 4) {
                c.attack += 3;
            }
        });
    }

    // TODO: argumente pentru power cards?

    // 0 - BUFF TOTI JUCATORII DE PE TEREN
    if (power.tip === 0) {
        player.cards.forEach(c => {
            c.attack += 1;
            c.defense += 1;
        });
    }

    // 1 - BUFF TOTI JUCATORII DE PE O LINIE
    if (power.tip === 1) {
        player.cards.forEach(c => {
            if (c.pos === 4) {
                c.attack += 3;
            }
        });
    }

    // 2 - BUFF TOTI JUCATORII DE PE TEREN APARTINAND ACELEASI TARI
    if (power.tip === 2) {
        player.cards.forEach(c => {
            if (c.country === "England") {
                c.attack += 2;
                c.defense += 2;
            }
        });
    }

    // 3 - BUFF TOTI JUCATORII DE PE TEREN APARTINAND ACELEASI ECHIPE
    if (power.tip === 3) {
        player.cards.forEach(c => {
            if (c.fc === "Liverpool") {
                c.attack += 3;
                c.defense += 3;
            }
        });
    }

    // 4 - BUFF TOTI JUCATORII DE PE TEREN CE INDEPLINESC O ANUMITA CONDITIE
    if (power.tip === 4) {
        player.cards.forEach(c => {
            if (c.attack <= 4) {
                c.attack *= 2;
            }
        });
    }

    // 5 - BUFF TOTI JUCATORII CE JOACA UN ANUMIT ROL(ex: portar)
    if (power.tip === 5) {
        player.cards.forEach(c => {
            if (c.tip == 0) {
                c.defense *= 3;
                c.attack += 2;
            }
        });
    }

    // 6 - DEBUFF TOTI JUCATORII ADVERSI DE PE O ANUMITA LINIE
    if (power.tip === 6) {
        players.forEach(
            p => {
                if (p.id !== connection.connectionId) {
                    p.cards.forEach(c => {
                        if (c.pos === 4) {
                            c.attack -= 2;
                            c.defense -= 2;
                        }
                    });
                }
            });
    }

    // 7 - DEBUFF TOTI JUCATORII ADVERSI DE PE TEREN
    if (power.tip === 7) {
        players.forEach(
            p => {
                if (p.id !== connection.connectionId) {
                    p.cards.forEach(c => {
                        c.attack -= 2;
                        c.defense -= 2;
                    });
                }
            });
    }

    // 8 - ELIMINA TOTI JUCATORII ADVERSI CE INDEPLINESC O ANUMITA CONDITIE
    if (power.tip === 8) {
        players.forEach(
            p => {
                if (p.id !== connection.connectionId) {
                    p.cards.forEach(c => {
                        if (c.defense <= 4) {
                            c.attack -= 2;
                            c.defense = 1;
                        }
                    });
                }
            });
    }
    */
}

var date = {
    "carte": [
        {
            "image": "https://placehold.it/200x200",
            "name": "adrian mutu",
            "attack": "5",
            "defense": "16",
            "fc": "rapid",
            "country": "romania",
            "tip": "0",
            "pos": "0"
        },
        {
            "image": "https://placehold.it/200x200",
            "name": "Jordan Pickford",
            "attack": "2",
            "defense": "8",
            "fc": "Everton",
            "country": "England",
            "tip": "0",
            "pos": "0"
        },
        {
            "image": "https://placehold.it/200x200",
            "name": "Kyle Walker",
            "attack": "4",
            "defense": "7",
            "fc": "Manchester City",
            "country": "England",
            "tip": "1",
            "pos": "0"
        },
        {
            "image": "https://placehold.it/200x200",
            "name": "Kieran Trippier",
            "attack": "2",
            "defense": "8",
            "fc": "Tottenham Hotspur",
            "country": "England",
            "tip": "1",
            "pos": "0"
        },
        {
            "image": "https://placehold.it/200x200",
            "name": "John Stones",
            "attack": "2",
            "defense": "5",
            "fc": "Manchester City",
            "country": "England",
            "tip": "1",
            "pos": "0"
        },
        {
            "image": "https://placehold.it/200x200",
            "name": "Eric Dier",
            "attack": "3",
            "defense": "5",
            "fc": "Tottenham Hotspur",
            "country": "England",
            "tip": "2",
            "pos": "0"
        },
        {
            "image": "https://placehold.it/200x200",
            "name": "Ross Barkley",
            "attack": "3",
            "defense": "6",
            "fc": "Chelsea",
            "country": "England",
            "tip": "2",
            "pos": "0"
        },
        {
            "image": "https://placehold.it/200x200",
            "name": "Jordan Henderson",
            "attack": "4",
            "defense": "5",
            "fc": "Liverpool",
            "country": "England",
            "tip": "2",
            "pos": "0"
        },
        {
            "image": "https://placehold.it/200x200",
            "name": "Harry Winks",
            "attack": "4",
            "defense": "4",
            "fc": "Tottenham Hotspur",
            "country": "England",
            "tip": "2",
            "pos": "0"
        },
        {
            "image": "https://placehold.it/200x200",
            "name": "Raheem Sterling",
            "attack": "8",
            "defense": "2",
            "fc": "Manchester City",
            "country": "England",
            "tip": "3",
            "pos": "0"
        },
        {
            "image": "https://placehold.it/200x200",
            "name": "Harry Kane",
            "attack": "8",
            "defense": "4",
            "fc": "Tottenham Hotspur",
            "country": "England",
            "tip": "3",
            "pos": "0"
        },
        {
            "image": "https://placehold.it/200x200",
            "name": "Marcus Rashford",
            "attack": "6",
            "defense": "2",
            "fc": "Manchester United",
            "country": "England",
            "tip": "3",
            "pos": "0"
        },
        {
            "image": "https://placehold.it/200x200",
            "name": "Hugo Lloris",
            "attack": "3",
            "defense": "8",
            "fc": "Tottenham Hotspur",
            "country": "France",
            "tip": "0",
            "pos": "0"
        },
        {
            "image": "https://placehold.it/200x200",
            "name": "Benjamin Pavard",
            "attack": "2",
            "defense": "6",
            "fc": "VfB Stuttgart",
            "country": "France",
            "tip": "1",
            "pos": "0",
            "": {}
        },
        {
            "image": "https://placehold.it/200x200",
            "name": "Presnel Kimpembe",
            "attack": "1",
            "defense": "7",
            "fc": "Paris Saint-Germain",
            "country": "France",
            "tip": "1",
            "pos": "0",
            "": {}
        },
        {
            "image": "https://placehold.it/200x200",
            "name": "Mamadou Sakho",
            "attack": "4",
            "defense": "5",
            "fc": "Crystal Palace",
            "country": "France",
            "tip": "1",
            "pos": "0",
            "": {}
        },
        {
            "image": "https://placehold.it/200x200",
            "name": "Lucas Digne",
            "attack": "3",
            "defense": "5",
            "fc": "Everton",
            "country": "France",
            "tip": "1",
            "pos": "0",
            "": {}
        },
        {
            "image": "https://placehold.it/200x200",
            "name": "Lucas Hernández",
            "attack": "2",
            "defense": "6",
            "fc": "Atlético Madrid",
            "country": "France",
            "tip": "1",
            "pos": "0",
            "": {}
        },
        {
            "image": "https://placehold.it/200x200",
            "name": "N'Golo Kanté",
            "attack": "4",
            "defense": "5",
            "fc": "Chelsea",
            "country": "France",
            "tip": "2",
            "pos": "0",
            "": {}
        },
        {
            "image": "https://placehold.it/200x200",
            "name": "Blaise Matuidi",
            "attack": "5",
            "defense": "6",
            "fc": "Juventus",
            "country": "France",
            "tip": "2",
            "pos": "0",
            "": {}
        },
        {
            "image": "https://placehold.it/200x200",
            "name": "Tanguy Ndombele",
            "attack": "5",
            "defense": "3",
            "fc": "Lyon",
            "country": "France",
            "tip": "2",
            "pos": "0",
            "": {}
        },
        {
            "image": "https://placehold.it/200x200",
            "name": "Antoine Griezmann",
            "attack": "7",
            "defense": "1",
            "fc": "Atlético Madrid",
            "country": "France",
            "tip": "3",
            "pos": "0",
            "": {}
        },
        {
            "image": "https://placehold.it/200x200",
            "name": "Thomas Lemar",
            "attack": "6",
            "defense": "4",
            "fc": "Atlético Madrid",
            "country": "France",
            "tip": "3",
            "pos": "0",
            "": {}
        },
        {
            "name": "Jack Butland",
            "attack": "2",
            "defense": "7",
            "fc": "Stoke City",
            "country": "England",
            "tip": "0",
            "pos": "0",
            "": {}
        },
        {
            "name": "Joe Gomez",
            "attack": "4",
            "defense": "5",
            "fc": "Liverpool",
            "country": "England",
            "tip": "1",
            "pos": "0",
            "": {}
        },
        {
            "name": "Trent Alexander-Arnold",
            "attack": "3",
            "defense": "6",
            "fc": "Liverpool",
            "country": "England",
            "tip": "1",
            "pos": "0",
            "": {}
        },
        {
            "name": "James Maddison",
            "attack": "3",
            "defense": "5",
            "fc": "Leicester City",
            "country": "England",
            "tip": "2",
            "pos": "0",
            "": {}
        },
        {
            "name": "Olivier Giroud",
            "attack": "5",
            "defense": "3",
            "fc": "Chelsea",
            "country": "France",
            "tip": "3",
            "pos": "0",
            "": {}
        },
        {
            "name": "Steve Mandanda",
            "attack": "3",
            "defense": "6",
            "fc": "Marseille",
            "country": "France",
            "tip": "0",
            "pos": "0",
            "": {}
        },
        {
            "name": "Paul Pogba",
            "attack": "5",
            "defense": "5",
            "fc": "Manchester United",
            "country": "France",
            "tip": "2",
            "pos": "0",
            "": {}
        },
        {
            "name": "Rapha�l Varane",
            "attack": "1",
            "defense": "8",
            "fc": "Real Madrid",
            "country": "France",
            "tip": "1",
            "pos": "0",
            "": {}
        },
        {
            "name": "Manuel Neuer",
            "attack": "3",
            "defense": "9",
            "fc": "Bayern Munich",
            "country": "Germany",
            "tip": "0",
            "pos": "0",
            "": {}
        },
        {
            "name": "Marc-Andr� ter Stegen",
            "attack": "2",
            "defense": "6",
            "fc": "Barcelona",
            "country": "Germany",
            "tip": "0",
            "pos": "0",
            "": {}
        },
        {
            "name": "Mats Hummels",
            "attack": "2",
            "defense": "5",
            "fc": "Bayern Munich",
            "country": "Germany",
            "tip": "1",
            "pos": "0",
            "": {}
        },
        {
            "name": "Niklas S�le",
            "attack": "2",
            "defense": "7",
            "fc": "Bayern Munich",
            "country": "Germany",
            "tip": "1",
            "pos": "0",
            "": {}
        },
        {
            "name": "Thilo Kehrer",
            "attack": "1",
            "defense": "5",
            "fc": "Paris Saint-Germain",
            "country": "Germany",
            "tip": "1",
            "pos": "0",
            "": {}
        },
        {
            "name": "Nico Schulz",
            "attack": "3",
            "defense": "8",
            "fc": "1899 Hoffenheim",
            "country": "Germany",
            "tip": "1",
            "pos": "0",
            "": {}
        },
        {
            "name": "Serge Gnabry",
            "attack": "4",
            "defense": "4",
            "fc": "Bayern Munich",
            "country": "Germany",
            "tip": "2",
            "pos": "0",
            "": {}
        },
        {
            "name": "Toni Kroos",
            "attack": "4",
            "defense": "5",
            "fc": "Real Madrid",
            "country": "Germany",
            "tip": "2",
            "pos": "0",
            "": {}
        },
        {
            "name": "Emre Can",
            "attack": "6",
            "defense": "4",
            "fc": "Juventus",
            "country": "Germany",
            "tip": "2",
            "pos": "0",
            "": {}
        },
        {
            "name": "Leroy San�",
            "attack": "5",
            "defense": "5",
            "fc": "Manchester City",
            "country": "Germany",
            "tip": "2",
            "pos": "0",
            "": {}
        },
        {
            "name": "Julian Brandt",
            "attack": "3",
            "defense": "4",
            "fc": "Bayer Leverkusen",
            "country": "Germany",
            "tip": "2",
            "pos": "0",
            "": {}
        },
        {
            "name": "Jonas Hector",
            "attack": "3",
            "defense": "8",
            "fc": "1. FC K�ln",
            "country": "Germany",
            "tip": "1",
            "pos": "0",
            "": {}
        },
        {
            "name": "Timo Werner",
            "attack": "8",
            "defense": "2",
            "fc": "RB Leipzig",
            "country": "Germany",
            "tip": "3",
            "pos": "0",
            "": {}
        },
        {
            "name": "Thomas M�ller",
            "attack": "8",
            "defense": "4",
            "fc": "Bayern Munich",
            "country": "Germany",
            "tip": "3",
            "pos": "0",
            "": {}
        },
        {
            "name": "Mark Uth",
            "attack": "6",
            "defense": "3",
            "fc": "Schalke 04",
            "country": "Germany",
            "tip": "3",
            "pos": "0",
            "": {}
        },
        {
            "name": "Iker Casillas",
            "attack": "3",
            "defense": "9",
            "fc": "Porto",
            "country": "Spain",
            "tip": "0",
            "pos": "0",
            "": {}
        },
        {
            "name": "David de Gea",
            "attack": "2",
            "defense": "7",
            "fc": "Manchester United",
            "country": "Spain",
            "tip": "0",
            "pos": "0",
            "": {}
        },
        {
            "name": "Sergio Ramos",
            "attack": "4",
            "defense": "8",
            "fc": "Real Madrid",
            "country": "Spain",
            "tip": "1",
            "pos": "0",
            "": {}
        },
        {
            "name": "Ra�l Albiol",
            "attack": "3",
            "defense": "8",
            "fc": "Napoli",
            "country": "Spain",
            "tip": "1",
            "pos": "0",
            "": {}
        },
        {
            "name": "C�sar Azpilicueta",
            "attack": "3",
            "defense": "7",
            "fc": "Chelsea",
            "country": "Spain",
            "tip": "1",
            "pos": "0",
            "": {}
        },
        {
            "name": "Nacho",
            "attack": "2",
            "defense": "5",
            "fc": "Real Madrid",
            "country": "Spain",
            "tip": "1",
            "pos": "0",
            "": {}
        },
        {
            "name": "Jos� Luis Gay�",
            "attack": "4",
            "defense": "5",
            "fc": "Valencia",
            "country": "Spain",
            "tip": "1",
            "pos": "0",
            "": {}
        },
        {
            "name": "Sergio Busquets",
            "attack": "6",
            "defense": "5",
            "fc": "Barcelona",
            "country": "Spain",
            "tip": "2",
            "pos": "0",
            "": {}
        },
        {
            "name": "Koke",
            "attack": "4",
            "defense": "5",
            "fc": "Atl�tico Madrid",
            "country": "Spain",
            "tip": "2",
            "pos": "0",
            "": {}
        },
        {
            "name": "Thiago",
            "attack": "6",
            "defense": "3",
            "fc": "Bayern Munich",
            "country": "Spain",
            "tip": "2",
            "pos": "0",
            "": {}
        },
        {
            "name": "Marco Asensio",
            "attack": "3",
            "defense": "3",
            "fc": "Real Madrid",
            "country": "Spain",
            "tip": "2",
            "pos": "0",
            "": {}
        },
        {
            "name": "Sa�l",
            "attack": "5",
            "defense": "5",
            "fc": "Atl�tico Madrid",
            "country": "Spain",
            "tip": "2",
            "pos": "0",
            "": {}
        },
        {
            "name": "�lvaro Morata",
            "attack": "6",
            "defense": "4",
            "fc": "Chelsea",
            "country": "Spain",
            "tip": "3",
            "pos": "0",
            "": {}
        },
        {
            "name": "Paco Alc�cer",
            "attack": "7",
            "defense": "4",
            "fc": "Borussia Dortmund",
            "country": "Spain",
            "tip": "3",
            "pos": "0",
            "": {}
        },
        {
            "name": "Rodrigo",
            "attack": "8",
            "defense": "2",
            "fc": "Valencia",
            "country": "Spain",
            "tip": "3",
            "pos": "0",
            "": {}
        }
    ],
    "power": [
        {
            "image": "../images/Efecte/Untitled_Diagram.jpg",
            "name": "cox",
            "description": "50$/gr",
            "tip": "0",
            "pos": "0"
        },
        {
            "image": "../images/Efecte/Untitled_Diagram.jpg",
            "name": "La atac!",
            "description": "Intreaga echipa se va concentra pe ofensiva, rezultand in +2 la atacul tuturor jucatorilor.",
            "tip": "1",
            "pos": "0",
            "argument": "0",
            "val_attack": "2",
            "val_defense": "0"
        },
        {
            "image": "../images/Efecte/Untitled_Diagram.jpg",
            "name": "In aparare!",
            "description": "Intreaga echipa se va concentra pe defenseensiva, rezultand in +2 la apararea tuturor jucatorilor.",
            "tip": "1",
            "pos": "0",
            "argument": "0",
            "val_attack": "0",
            "val_defense": "2"
        },
        {
            "image": "../images/Efecte/Untitled_Diagram.jpg",
            "name": "Galerie bazata!",
            "description": "Morala intregii echipe creste, rezultand in +1/+1 la atacul/apararea tuturor jucatorilor.",
            "tip": "1",
            "pos": "0",
            "argument": "0",
            "val_attack": "1",
            "val_defense": "1"
        },
        {
            "image": "../images/Efecte/Untitled_Diagram.jpg",
            "name": "Pe ei, bajeti!",
            "description": "Morala jucatorilor din atac creste, rezultand in +3/+0 la punctele fiecaruia.",
            "tip": "1",
            "pos": "0",
            "argument": "4",
            "val_attack": "3",
            "val_defense": "0"
        },
        {
            "image": "../images/Efecte/Untitled_Diagram.jpg",
            "name": "Haida la autobuz!",
            "description": "Morala jucatorilor din aparare creste, rezultand in +1/+3 la punctele fiecaruia.",
            "tip": "1",
            "pos": "0",
            "argument": "1",
            "val_attack": "1",
            "val_defense": "3"
        },
        {
            "image": "../images/Efecte/Untitled_Diagram.jpg",
            "name": "Vive la france!",
            "description": "Toti jucatorii francezi se simt motivati, rezultand in +2/+2 la punctele fiecaruia.",
            "tip": "2",
            "pos": "0",
            "argument": "France",
            "val_attack": "2",
            "val_defense": "2"
        },
        {
            "image": "../images/Efecte/Untitled_Diagram.jpg",
            "name": "Long live the Queen!",
            "description": "Toti jucatorii englezi se simt motivati, rezultand in +3/+1 la punctele fiecaruia.",
            "tip": "2",
            "pos": "0",
            "argument": "England",
            "val_attack": "3",
            "val_defense": "1"
        },
        {
            "image": "../images/Efecte/Untitled_Diagram.jpg",
            "name": "Atl�tico FTW!",
            "description": "Toti jucatorii de la Atl�tico Madrid se simt motivati, rezultand in +3/+3 la punctele fiecaruia.",
            "tip": "3",
            "pos": "0",
            "argument": "Atl�tico Madrid",
            "val_attack": "3",
            "val_defense": "3"
        },
        {
            "image": "../images/Efecte/Untitled_Diagram.jpg",
            "name": "Tottenham RULZ!",
            "description": "Toti jucatorii de la Tottenham Hotspur se simt motivati, rezultand in +5/+1 la punctele fiecaruia.",
            "tip": "3",
            "pos": "0",
            "argument": "Tottenham Hotspur",
            "val_attack": "5",
            "val_defense": "1"
        },
        {
            "image": "../images/Efecte/Untitled_Diagram.jpg",
            "name": "Hai Gigele, inscriem si noi pana inchid astia la nonstop?",
            "description": "Toti jucatorii cu mai putin de 4 puncte la atac se simt motivati, rezultand in dublarea punctelor de atac.",
            "tip": "4",
            "pos": "0",
            "argument": "4",
            "val_attack": "2",
            "val_defense": "1"
        },
        {
            "image": "../images/Efecte/Untitled_Diagram.jpg",
            "name": "Haida mai defenseensiv ca oricum castigam!",
            "description": "Toti jucatorii cu mai putin de 5 puncte la aparare se simt motivati, rezultand in dublarea punctelor de atac.",
            "tip": "4",
            "pos": "0",
            "argument": "5",
            "val_attack": "1",
            "val_defense": "2"
        },
        {
            "image": "../images/Efecte/Untitled_Diagram.jpg",
            "name": "La atac, bajetii!",
            "description": "Toti jucatorii cu rolul atacant se simt motivati, rezultand in triplarea punctelor de atac.",
            "tip": "5",
            "pos": "0",
            "argument": "4",
            "val_attack": "3",
            "val_defense": "1"
        },
        {
            "image": "../images/Efecte/Untitled_Diagram.jpg",
            "name": "Haida portare, stiu ca poti!",
            "description": "Portarul se simte motivat, rezultand in triplarea punctelor de atac/aparare.",
            "tip": "5",
            "pos": "0",
            "argument": "4",
            "val_attack": "3",
            "val_defense": "3"
        },
        {
            "image": "../images/Efecte/Untitled_Diagram.jpg",
            "name": "Petarzi!",
            "description": "Jucatorii adversi din atac sunt speriati, rezultand in in -3/-1 la punctele fiecaruia.",
            "tip": "6",
            "pos": "0",
            "argument": "4",
            "val_attack": "3",
            "val_defense": "1"
        },
        {
            "image": "../images/Efecte/Untitled_Diagram.jpg",
            "name": "Galerie adversa rasunatoare!",
            "description": "Jucatorii adversi sunt demoralizati, rezultand in in -2/-2 la punctele fiecaruia.",
            "tip": "7",
            "pos": "0",
            "argument": "0",
            "val_attack": "2",
            "val_defense": "2"
        },
        {
            "image": "../images/Efecte/Untitled_Diagram.jpg",
            "name": "Tzeapa la francezi!",
            "description": "Jucatorii adversi de nationalite franceza sunt demoralizati, rezultand in in -4/-3 la punctele fiecaruia.",
            "tip": "8",
            "pos": "0",
            "argument": "France",
            "val_attack": "4",
            "val_defense": "3"
        },
        {
            "image": "../images/Efecte/Untitled_Diagram.jpg",
            "name": "It's coming home!",
            "description": "Jucatorii adversi de nationalite engleza sunt demoralizati, rezultand in in -3/-4 la punctele fiecaruia.",
            "tip": "8",
            "pos": "0",
            "argument": "England",
            "val_attack": "3",
            "val_defense": "4"
        },
        {
            "image": "../images/Efecte/Untitled_Diagram.jpg",
            "name": "Haida ca se poate!",
            "description": "Jucatorii de pe linia selectata se simt motivati, rezultand in +3/+2 la punctele fiecaruia.",
            "tip": "9",
            "pos": "0",
            "argument": "0",
            "val_attack": "3",
            "val_defense": "2"
        },
        {
            "image": "../images/Efecte/Untitled_Diagram.jpg",
            "name": "Treceti la atac!",
            "description": "Jucatorii de pe linia selectata se simt motivati, rezultand in +5/+0 la punctele fiecaruia.",
            "tip": "9",
            "pos": "0",
            "argument": "0",
            "val_attack": "5",
            "val_defense": "0"
        },
        {
            "image": "../images/Efecte/Untitled_Diagram.jpg",
            "name": "Deutschland �ber Alles!",
            "description": "Toti jucatorii germani se simt motivati, rezultand in +3/+2 la punctele fiecaruia.",
            "tip": "2",
            "pos": "0",
            "argument": "Germany",
            "val_attack": "3",
            "val_defense": "2"
        },
        {
            "image": "../images/Efecte/Untitled_Diagram.jpg",
            "name": "Bayern �ber Alles!",
            "description": "Toti jucatorii de la Bayern Munich se simt motivati, rezultand in +4/+3 la punctele fiecaruia.",
            "tip": "3",
            "pos": "0",
            "argument": "Bayern Munich",
            "val_attack": "4",
            "val_defense": "3"
        },
        {
            "image": "../images/Efecte/Untitled_Diagram.jpg",
            "name": "Viva Espa�a!",
            "description": "Toti jucatorii spanioli se simt motivati, rezultand in +5/+0 la punctele fiecaruia.",
            "tip": "2",
            "pos": "0",
            "argument": "Spain",
            "val_attack": "5",
            "val_defense": "0"
        },
        {
            "image": "../images/Efecte/Untitled_Diagram.jpg",
            "name": "Viva Real Madrid!",
            "description": "Toti jucatorii de la Real Madrid se simt motivati, rezultand in +4/+4 la punctele fiecaruia.",
            "tip": "3",
            "pos": "0",
            "argument": "Real Madrid",
            "val_attack": "4",
            "val_defense": "4"
        },
        {
            "image": "../images/Efecte/Untitled_Diagram.jpg",
            "name": "Viva Atl�tico Madrid!",
            "description": "Toti jucatorii de la Atl�tico Madrid se simt motivati, rezultand in +3/+5 la punctele fiecaruia.",
            "tip": "3",
            "pos": "0",
            "argument": "Atletico Madrid",
            "val_attack": "3",
            "val_defense": "5"
        }
    ],
    "coach": [
        {
            "image": "../images/antrenori_poze/1_antrenor.jpg",
            "name": "Gheorghe Hagi",
            "passive": "0",
            "descpassive": "Pasiva: Ai, n-ai mingea, tragi la poarta! --> fiecare jucator primeste +3/-1 la punctele sale.",
            "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. In soluta repudiandae odio, provident quod hic harum delectus, sunt voluptatem architecto atque, expedita labore alias sequi.",
            "active": "0",
            "descactive": "Activa: Poti sa te ascunzi, dar nu te poti ascunde! --> fiecare jucator advers primeste -2/-2 la punctele sale."
        },
        {
            "image": "../images/antrenori_poze/2_antrenor.jpg",
            "name": "Gareth Southgate",
            "passive": "1",
            "descpassive": "Pasiva: Stand as one! --> fiecare jucator englez primeste +2/+2 la punctele sale.",
            "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. In soluta repudiandae odio, provident quod hic harum delectus, sunt voluptatem architecto atque, expedita labore alias sequi.",
            "active": "1",
            "descactive": "Activa: We can do this! --> fiecare jucator englez primeste +4/+4 la punctele sale."
        },
        {
            "image": "../images/antrenori_poze/3_antrenor.jpg",
            "name": "Didier Dechamps",
            "passive": "2",
            "descpassive": "Pasiva: Al� al� al�! --> fiecare jucator francez primeste +3/+1 la punctele sale.",
            "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. In soluta repudiandae odio, provident quod hic harum delectus, sunt voluptatem architecto atque, expedita labore alias sequi.",
            "active": "2",
            "descactive": "Activa: Qu�est-ce que vous avez pr�par� pour aujourd�hui? --> fiecare jucator advers primeste -3/-1 la punctele sale."
        },
        {
            "image": "../images/antrenori_poze/4_antrenor.jpg",
            "name": "Joachim Low",
            "passive": "3",
            "descpassive": "Pasiva: Blitzkrieg! --> fiecare jucator german primeste +5/+0 la punctele sale.",
            "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. In soluta repudiandae odio, provident quod hic harum delectus, sunt voluptatem architecto atque, expedita labore alias sequi.",
            "active": "3",
            "descactive": "Activa: Was ist das? *mana in pantaloni* --> fiecare jucator advers primeste -3/-3 la punctele sale."
        },
        {
            "image": "../images/antrenori_poze/5_antrenor.jpg",
            "name": "Luis Enrique",
            "passive": "4",
            "descpassive": "Pasiva: Yo soy loca con mi tigre! --> fiecare jucator spaniol primeste +4/+1 la punctele sale.",
            "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. In soluta repudiandae odio, provident quod hic harum delectus, sunt voluptatem architecto atque, expedita labore alias sequi.",
            "active": "4",
            "descactive": "Activa: Estas muy loco --> fiecare jucator advers primeste -1/-5 la punctele sale."
        }
    ]
};