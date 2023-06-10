namespace WebAPI.DTOs
{
    public class CreateNotificationDTO
    {
        public Guid ProductId { get; set; }
        public Guid UserId { get; set; }
    }
}
