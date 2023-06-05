using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class EmailDTO
    {
        public From Sender { get; set; }
        public IEnumerable<Receiver> To { get; set; }
        public string HtmlContent { get; set; }
        public string Subject { get; set; }
        public class From
        {
            public string Name { get; set; }
            public string Email { get; set; }
        }

        public class Receiver
        {
            public string Email { get; set; }
            public string Name { get; set; }
        }

    }
}
