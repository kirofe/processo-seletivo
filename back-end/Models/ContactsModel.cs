using System.Text.Json.Serialization;

namespace back_end.Models
{
    public class ContactsModel
    {
        [JsonPropertyName("id")]
        public Guid Id { get; set; }

        [JsonPropertyName("firstName")]
        public String? FirstName { get; set; }

        [JsonPropertyName("lastName")]
        public String? LastName { get; set; }

        [JsonPropertyName("email")]
        public String? Email { get; set; }

        [JsonPropertyName("phone")]
        public String? Phone { get; set; }

        [JsonPropertyName("cpf")]
        public String? CPF { get; set; }

        [JsonPropertyName("cep")]
        public String? CEP { get; set; }
    }
}
