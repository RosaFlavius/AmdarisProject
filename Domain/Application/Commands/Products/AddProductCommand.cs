﻿using Domain.Customers;
using Domain.Products;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Commands
{
    public class AddProductCommand : IRequest<Product>
    {
        public AddProductCommand()
        {
        }

        public string Name { get; set; }

        public string Brand { get; set; }

        public string Description { get; set; }

        public float Price { get; set; }

        public Category Categories { get; set; }

        public enum Category
        {
            Supplements = 1,
            Equipment = 2,
            Clothes = 3,
        }


    }
}