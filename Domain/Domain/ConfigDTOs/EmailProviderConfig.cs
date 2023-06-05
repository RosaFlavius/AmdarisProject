using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ConfigDTOs
{
    public class EmailProviderConfig
    {
        public string BaseURL { get; set; }
        public string ApiKey { get; set; }
    }
}
