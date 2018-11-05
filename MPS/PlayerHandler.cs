using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Threading.Tasks;
using WebSocketManager;
using WebSocketManager.Common;

namespace MPS
{
    public class PlayerHandler : WebSocketHandler
    {
        public PlayerHandler(WebSocketConnectionManager webSocketConnectionManager) : base(webSocketConnectionManager)
        {
        }

        public async Task ConnectedPlayer(string socketId, string serializedPlayer)
        {
            var player = JsonConvert.DeserializeObject<Player>(serializedPlayer);
            var exists = GameManager.Instance.Players.ContainsKey(socketId);
            if (!exists)
                GameManager.Instance.Players.TryAdd(player.id, player);
            if (GameManager.Instance.Players.Count == 2)
            {
                Random rnd = new Random();
                int starter = rnd.Next(0, 1);
                GameManager.Instance.Players.ElementAt(starter).Value.turn = true;
                var listOfPlayers = JsonConvert.SerializeObject(GameManager.Instance.Players.Values);
                InvokeClientMethodToAllAsync("pingPlayers", listOfPlayers).Wait();
            }
        }

        public async Task DisconnectedPlayer(string socketId, string pewpew)
        {
            GameManager.Instance.Players.TryRemove(socketId, out Player pew);
        }

        public async Task Update(string socketId, string playerData)
        {
            var player = JsonConvert.DeserializeObject<Player>(playerData);
            GameManager.Instance.Players.TryGetValue(player.id, out Player exists);
            if (exists != null)
            {
                //TODO: Update logic
                exists.turn = player.turn;
                exists.pass = player.pass;
                exists.opponentPass = player.opponentPass;
                exists.cards = player.cards;
                exists.coach = player.coach;
                exists.powers = player.powers;
                exists.opCards = player.opCards;
                exists.roundCount = player.roundCount;
                exists.score = player.score;
            }
            foreach (var key in GameManager.Instance.Players.Keys)
            {
                if (key != player.id && player.turn == false)
                {
                    GameManager.Instance.Players[key].turn = true;

                    var shouldUpdateOpCards = false;
                    foreach (var opponentCardUpdated in player.opCards)
                    {
                        foreach (var opponentCard in GameManager.Instance.Players[key].cards)
                        {
                            if (opponentCardUpdated.name == opponentCard.name && 
                                (opponentCardUpdated.attack != opponentCard.attack ||
                                 opponentCardUpdated.defense != opponentCard.defense || 
                                 opponentCardUpdated.pos != opponentCard.pos)) 
                            {
                                shouldUpdateOpCards = true;
                                break;
                            }
                        }

                        if (shouldUpdateOpCards == true)
                        {
                            break;
                        }
                    }

                    if (shouldUpdateOpCards == true) 
                    {
                        GameManager.Instance.Players[key].cards = player.opCards;
                    }
                }

                if (key != player.id && player.pass == true)
                {
                    GameManager.Instance.Players[key].opponentPass = true;
                }
            }

            var listOfPlayers = JsonConvert.SerializeObject(GameManager.Instance.Players.Values);
            InvokeClientMethodToAllAsync("pingPlayers", listOfPlayers).Wait();

        }

        public override async Task OnConnected(WebSocket socket)
        {
            await base.OnConnected(socket);

            string socketId = WebSocketConnectionManager.GetId(socket);

            var message = new Message
            {
                MessageType = MessageType.Text,
                Data = $"Player with socket id :{socketId} is now connected!"
            };

            await SendMessageToAllAsync(message);
        }

        public override async Task OnDisconnected(WebSocket socket)
        {
            await base.OnDisconnected(socket);

            var socketId = WebSocketConnectionManager.GetId(socket);

            var message = new Message
            {
                MessageType = MessageType.Text,
                Data = $"Player with socket id :{socketId} is now disconnected!"
            };

            await SendMessageToAllAsync(message);
        }
    }
}
