create EXTENSION if not EXISTS "pgcrypto";
-- user table
CREATE  TABLE users(
user_id UUID PRIMARY key DEFAULT gen_random_uuid(),
first_name VARCHAR(50) not NULL,
last_name VARCHAR(50) not NULL,
email VARCHAR(100) UNIQUE not NULL,
username VARCHAR(50) UNIQUE not NULL,
user_password text not NULL,
created_at TIMESTAMP with time ZONE DEFAULT NOW()
);
-- password reset codes
CREATE TABLE password_reset_codes (
    code_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    code VARCHAR(6) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    used BOOLEAN DEFAULT FALSE
);
-- user address 
CREATE  TABLE user_addresses(
address_id UUID PRIMARY key DEFAULT gen_random_uuid(),
user_id UUID not NULL,
address_1 VARCHAR(50) not NULL,
address_2 VARCHAR(50),
city VARCHAR(50) not NULL,
state VARCHAR(50),
postal_code VARCHAR(20),
country VARCHAR(50) not NULL,
is_default_shipping BOOLEAN DEFAULT FALSE,
CONSTRAINT fk_user
FOREIGN KEY(user_id)
REFERENCES users(user_id)
on DELETE CASCADE
);
-- cart  
CREATE  TABLE carts(
cart_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
user_id UUID UNIQUE NOT NULL,
created_at TIMESTAMP with time zone DEFAULT NOW(),
CONSTRAINT fk_cart_user
FOREIGN key(user_id)
REFERENCES users(user_id)
on DELETE CASCADE
);
-- product 
CREATE  TABLE products(
product_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
title VARCHAR(100) not NULL,
description TEXT,
price NUMERIC(10,2) not null CHECK (price >=0),
image_url TEXT NOT NULL,
quantity INTEGER not null DEFAULT 0 CHECK (quantity >=0),
created_at TIMESTAMP with time zone DEFAULT NOW()
);
-- category
CREATE TABLE categories(
category_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
category_name VARCHAR(50) UNIQUE not NULL
);
-- product category
create table products_categories(
product_id UUID not NULL,
category_id UUID NOT NULL,
PRIMARY key (product_id,category_id),
FOREIGN key (product_id)
REFERENCES products(product_id)
on DELETE CASCADE,
FOREIGN key (category_id)
REFERENCES categories(category_id)
on DELETE CASCADE
);
-- cart products
CREATE  table cart_products(
cart_id UUID NOT NULL,
product_id UUID NOT NULL,
cart_quantity INTEGER not null CHECK (cart_quantity > 0),
PRIMARY KEY (cart_id,product_id),
FOREIGN key (cart_id)
REFERENCES carts(cart_id)
on DELETE CASCADE,
FOREIGN key (product_id)
REFERENCES products(product_id)
on delete CASCADE
);
-- order  
create table orders(
order_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
user_id UUID NOT NULL,
shipping_address_id UUID,
order_total NUMERIC(10,2) not null check (order_total >= 0),
payment_satus VARCHAR DEFAULT 'pending',
order_date TIMESTAMP with time zone DEFAULT NOW(),
FOREIGN key (user_id)
REFERENCES users(user_id)
on DELETE CASCADE,
FOREIGN key (shipping_address_id)
REFERENCES user_addresses(address_id)
);
-- order products
create TABLE orders_products(
order_id UUID NOT NULL,
product_id UUID NOT NULL,
ordered_quantity INTEGER not null check (ordered_quantity > 0),
price_at_purchase NUMERIC(10,2) not NULL,
PRIMARY key (order_id,product_id),
FOREIGN key (order_id)
REFERENCES orders(order_id)
on DELETE CASCADE,
FOREIGN key (product_id)
REFERENCES products(product_id)
);
-- order payment
CREATE  table order_payments(
order_payment_id UUID PRIMARY key DEFAULT gen_random_uuid(),
order_id UUID NOT NULL,
payment_reference VARCHAR(100),
amount NUMERIC(10,2) not null check (amount >= 0),
status BOOLEAN DEFAULT FALSE,
created_at TIMESTAMP with time zone DEFAULT NOW(),
FOREIGN key (order_id)
REFERENCES orders(order_id)
on DELETE CASCADE
);
