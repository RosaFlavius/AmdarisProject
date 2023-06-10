namespace WebAPI.DTOs
{
    public class CreateOrderNotificationDTO
    {
        public Guid OrderId { get; set; }
        public Guid UserId { get; set; }
    }
}
