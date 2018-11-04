using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MPS
{
    public class Player
    {
        public string id { get; set; }
        public Coach coach { get; set; }
        public Card[] cards { get; set; }
        public Power[] powers { get; set; }
        public bool pass { get; set; }
        public bool turn { get; set; }
        public bool opponentPass { get; set; }
        public Card[] opCards { get; set; }
        public int roundCount { get; set; }
        public int score { get; set; }
    }

    public class Card
    {
        public string image { get; set; }
        public string name { get; set; }
        public int attack { get; set; }
        public int defense { get; set; }
        public string fc { get; set; }
        public string country { get; set; }
        public int tip { get; set; }
        public int pos { get; set; }
    }

    public class Power
    {
        public string image { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public int tip { get; set; }
        public int pos { get; set; }
    }

    public class Coach
    {
        public string image { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string descpassive { get; set; }
        public string descactive { get; set; }
        public int active { get; set; }
        public int passive { get; set; }
    }
}
