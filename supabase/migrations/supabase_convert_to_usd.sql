
-- Migration to convert product prices from INR to USD
-- Assuming the previous prices were stored as INR units (e.g. 5000 for 5000 INR)
-- We divide by 100 to approximate comparable USD prices (e.g. 5000 -> 50 USD)

UPDATE products 
SET price = price / 100
WHERE price > 500; -- Safety check to ensure we don't divide already small numbers if run twice

-- Verify updates
-- SELECT name, price FROM products;
