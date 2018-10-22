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
        public ConcurrentDictionary<string, Snake> Snakes { get; set; }
        public Timer Timer;
        private SnakeHandler _snakeHandler;
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

        public void Initilize(SnakeHandler snakeHandler)
        {
            _snakeHandler = snakeHandler;
            Snakes = new ConcurrentDictionary<string, Snake>();
            Timer = new Timer(Callback, null, 0, 1000 / 15);
        }

        private void Callback(object state)
        {
            var listOfSnakes = JsonConvert.SerializeObject(Snakes.Values);
            //var a = Startup.ServiceProvider;
            //var b = a.GetService<SnakeHandler>();
            //var c = b.InvokeClientMethodToAllAsync("pingSnakes", listOfSnakes);
            //c.Wait();
            _snakeHandler.InvokeClientMethodToAllAsync("pingSnakes", listOfSnakes).Wait();
            //Startup.ServiceProvider.GetRequiredService<SnakeHandler>()
            //    .InvokeClientMethodToAllAsync("pingSnakes", listOfSnakes)
            //    .Wait();
        }

    }
}
