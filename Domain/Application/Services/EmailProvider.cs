using Application.Abstract;
using Application.DTOs;
using Domain.ConfigDTOs;
using Microsoft.Extensions.Options;
using Microsoft.VisualBasic.FileIO;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Nodes;
using System.Threading.Tasks;

namespace Application.Services
{
    public class EmailProvider : IEmailService
    {
        private readonly HttpClient _httpClient;
        private readonly IOptions<EmailProviderConfig> _options;
        public EmailProvider(HttpClient httpClient, IOptions<EmailProviderConfig> options)
        {
            _httpClient = httpClient;
            _options = options;
        }
       public async Task<BrevoEmailResponseDTO> SendInStockNotification(EmailDTO emailToSent)
        {
            SetClientConfigs();
            var body = JsonConvert.SerializeObject(emailToSent);
            var content = new StringContent(body, Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync("smtp/email", content);
            if (response.IsSuccessStatusCode)
            {
                var res = JsonConvert.DeserializeObject<BrevoEmailResponseDTO>(await response.Content.ReadAsStringAsync());
                return res;
            }
            throw new Exception(await response.Content.ReadAsStringAsync());
        }

        public async Task<BrevoEmailResponseDTO> SendOrderConfirmation(EmailOrderDTO emailToSent)
        {
            SetClientConfigs();
            var body = JsonConvert.SerializeObject(emailToSent);
            var content = new StringContent(body, Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync("smtp/email", content);
            if (response.IsSuccessStatusCode)
            {
                var res = JsonConvert.DeserializeObject<BrevoEmailResponseDTO>(await response.Content.ReadAsStringAsync());
                return res;
            }
            throw new Exception(await response.Content.ReadAsStringAsync());
        }

        private void SetClientConfigs()
        {
            _httpClient.BaseAddress = new Uri(_options.Value.BaseURL);
            _httpClient.DefaultRequestHeaders.Add("accept", "application/json");
            _httpClient.DefaultRequestHeaders.Add("api-key", _options.Value.ApiKey);
        }
    }
}
