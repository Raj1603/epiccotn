-- Run this in your Supabase SQL Editor to permanently update the product images

-- Pen
UPDATE products SET images = ARRAY['/images/modern_titanium_pen.png'] WHERE id = 'b9e0dbb2-11d3-4751-b9d7-b925a8b822d4';

-- Leather Mag Wallet
UPDATE products SET images = ARRAY['/images/leather_mag_wallet.png'] WHERE id = '0d0e78f2-ca3e-4b7f-8b20-41e8cd9d495a';

-- Kevlar Cable 3M
UPDATE products SET images = ARRAY['/images/rugged_kevlar_cable.png'] WHERE id = '9329ddc5-ee21-489c-bdc6-4906a8756343';

-- Modern Passport Wallet
UPDATE products SET images = ARRAY['/images/modern_passport_wallet.png'] WHERE id = '9cc49644-22dc-492f-b37c-d63bed0d653e';

-- Rugged Archive Wallet
UPDATE products SET images = ARRAY['/images/leather-folio-brown.jpg'] WHERE id = '77fee0e1-474d-42c0-8509-af718b5d139d';

-- Modern Leather Case (i17)
UPDATE products SET images = ARRAY['/images/modern_leather_case_brown.png'] WHERE id = '9f4f19ef-885c-4d5a-afa5-c46761f116c2';

-- Modern Leather Case (Generic)
UPDATE products SET images = ARRAY['/images/modern_leather_case_brown.png'] WHERE id = '63d4e469-8de2-422b-bb0d-1ef4f7d81d50';

-- Card Wallet Plus
UPDATE products SET images = ARRAY['/images/card_wallet_plus.png'] WHERE id = 'c5fa3789-7560-4e19-a6cb-3320157adba3';

-- Bifold Wallet
UPDATE products SET images = ARRAY['/images/bifold.jpg'] WHERE id = 'a00d4b8f-a62d-4091-aa8c-ba79cbea3678';

-- Stand Wallet
UPDATE products SET images = ARRAY['/images/tracking_card.jpg'] WHERE id = '862e9f81-f8fd-46c0-af5e-1028469e1bee';
