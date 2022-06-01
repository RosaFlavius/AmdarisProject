namespace Domain.Products
{
    public class Order
    {
        public Order()
        {
            Id = Guid.NewGuid();
            Products = new List<OrderProducts>();
        }

        public Guid Id { get; set; }
       
        public ICollection<OrderProducts> Products { get; set; }
        
        public double TotalPrice { get; set; }
    }
}
