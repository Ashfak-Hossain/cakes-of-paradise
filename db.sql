CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    phone VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(100),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_purchase_date TIMESTAMP
);

CREATE TABLE suppliers (
    supplier_id SERIAL PRIMARY KEY,
    supplier_name VARCHAR(100) NOT NULL,
    contact_name VARCHAR(100),
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    supplied_ingredients JSONB,  -- Stores list of ingredients they supply
    payment_terms TEXT
);

CREATE TABLE ingredients (
    ingredient_id SERIAL PRIMARY KEY,
    ingredient_name VARCHAR(100) UNIQUE NOT NULL,
    unit_of_measure VARCHAR(20) NOT NULL,  -- kg, liter, packet, etc
    current_stock DECIMAL(10,2) DEFAULT 0,
    reorder_level DECIMAL(10,2),
    supplier_id INT REFERENCES suppliers(supplier_id)
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,  -- cake, pastry, cookies, etc
    price DECIMAL(10,2) NOT NULL,
    cost_to_make DECIMAL(10,2) NOT NULL,  -- Calculated from ingredients
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE product_ingredients (
    product_id INT REFERENCES products(product_id),
    ingredient_id INT REFERENCES ingredients(ingredient_id),
    quantity DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (product_id, ingredient_id)
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(customer_id),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50),
    status VARCHAR(20) DEFAULT 'pending'
);

CREATE TABLE order_details (
    order_detail_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(order_id),
    product_id INT REFERENCES products(product_id),
    quantity INT NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL
);

CREATE TABLE purchases (
    purchase_id SERIAL PRIMARY KEY,
    supplier_id INT REFERENCES suppliers(supplier_id),
    ingredient_id INT REFERENCES ingredients(ingredient_id),
    quantity DECIMAL(10,2) NOT NULL,
    unit_cost DECIMAL(10,2) NOT NULL,
    total_cost DECIMAL(10,2) NOT NULL,
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE inventory_log (
    log_id SERIAL PRIMARY KEY,
    ingredient_id INT REFERENCES ingredients(ingredient_id),
    change_amount DECIMAL(10,2) NOT NULL,
    log_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reference_type VARCHAR(20),  -- 'purchase' or 'order'
    reference_id INT  -- Links to either purchase_id or order_id
);