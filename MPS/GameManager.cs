using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Concurrent;
using System.Threading;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;

namespace MPS
{
    public class GameManager
    {

        private static GameManager instance;
        private static readonly object padLock = new object();
       // public ConcurrentDictionary<string, Snake> Snakes { get; set; }
        public ConcurrentDictionary<string, Player> Players { get; set; }
        public Timer Timer;
        //private SnakeHandler _snakeHandler;
        private PlayerHandler _playerHandler;
        public static GameManager Instance
        {
            get
            {
                lock (padLock)
                {
                    return instance ?? (instance = new GameManager());
                }
            }
        }

        public void Initilize(PlayerHandler playerHandler)
        {
            _playerHandler = playerHandler;
            Players = new ConcurrentDictionary<string, Player>();
            Timer = new Timer(Callback, null, 0, 500);
        }

        private void Callback(object state)
        {
            var listOfPlayers = JsonConvert.SerializeObject(Players.Values);
            _playerHandler.InvokeClientMethodToAllAsync("pingPlayers", listOfPlayers).Wait();
        }

    }
}
