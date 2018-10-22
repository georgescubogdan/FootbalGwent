using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MPS
{
    public class Snake
    {
        public string id { get; set; }

        public int x { get; set; }

        public int y { get; set; }

        public int tail { get; set; }

        public object[] trail { get; set; }
    }
}
