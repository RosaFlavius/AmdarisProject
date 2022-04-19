﻿using Domain.Products;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Queries.Orders
{
    public class GetAllOrdersQuery : IRequest<IEnumerable<Order>>
    {
    }
}
