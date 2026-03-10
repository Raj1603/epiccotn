const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

function getEnv() {
    const envPath = path.join(process.cwd(), '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const lines = envContent.split('\n');
    const env = {};
    lines.forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            env[key.trim()] = value.trim();
        }
    });
    return env;
}

async function fixImagesAbsolute() {
    const env = getEnv();
    const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const updates = [
        { id: 'b9e0dbb2-11d3-4751-b9d7-b925a8b822d4', name: 'Pen', images: ['/images/modern_titanium_pen.png'] },
        { id: '0d0e78f2-ca3e-4b7f-8b20-41e8cd9d495a', name: 'Leather Mag Wallet', images: ['/images/leather_mag_wallet.png'] },
        { id: '9329ddc5-ee21-489c-bdc6-4906a8756343', name: 'Kevlar Cable 3M', images: ['/images/rugged_kevlar_cable.png'] },
        { id: '9cc49644-22dc-492f-b37c-d63bed0d653e', name: 'Modern Passport Wallet', images: ['/images/modern_passport_wallet.png'] },
        { id: '77fee0e1-474d-42c0-8509-af718b5d139d', name: 'Rugged Archive Wallet', images: ['/images/leather-folio-brown.jpg'] },
        { id: '9f4f19ef-885c-4d5a-afa5-c46761f116c2', name: 'Modern Leather Case (i17)', images: ['/images/modern_leather_case_brown.png'] },
        { id: '63d4e469-8de2-422b-bb0d-1ef4f7d81d50', name: 'Modern Leather Case', images: ['/images/modern_leather_case_brown.png'] },
        { id: 'c5fa3789-7560-4e19-a6cb-3320157adba3', name: 'Card Wallet Plus', images: ['/images/card_wallet_plus.png'] },
        { id: 'a00d4b8f-a62d-4091-aa8c-ba79cbea3678', name: 'Bifold Wallet', images: ['/images/bifold.jpg'] },
        { id: '862e9f81-f8fd-46c0-af5e-1028469e1bee', name: 'Stand Wallet', images: ['/images/tracking_card.jpg'] }
    ];

    console.log("Starting absolute database updates via IDs...");

    for (const update of updates) {
        console.log(`Updating ${update.name} (${update.id})...`);
        const { data, error, count } = await supabase
            .from('products')
            .update({ images: update.images }, { count: 'exact' })
            .eq('id', update.id)
            .select();

        if (error) {
            console.error(`Error updating ${update.name}:`, error.message);
        } else {
            console.log(`Successfully updated ${update.name}. Rows affected: ${count}`);
        }
    }

    console.log("Absolute updates complete.");
}

fixImagesAbsolute();
