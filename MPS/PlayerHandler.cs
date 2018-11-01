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
                exists.test = player.test;
            }
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
