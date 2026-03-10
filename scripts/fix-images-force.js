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

async function fixImagesForce() {
    const env = getEnv();
    const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const updates = [
        { name: 'Pen', images: ['/images/modern_titanium_pen.png'] },
        { name: 'Leather Mag Wallet Find My Tracking', images: ['/images/leather_mag_wallet.png'] },
        { name: 'Kevlar Cable 3M', images: ['/images/rugged_kevlar_cable.png'] },
        { name: 'Modern Passport Wallet', images: ['/images/modern_passport_wallet.png'] },
        { name: 'Rugged Archive Wallet', images: ['/images/rugged_case_orange.png'] },
        { name: 'Modern Leather Case', images: ['/images/modern_leather_case_brown.png'] },
        { name: 'Card Wallet Plus', images: ['/images/leather_mag_wallet.png'] },
        { name: 'Bifold Wallet', images: ['/images/modern_passport_wallet.png'] }
    ];

    console.log("Starting force database updates...");

    for (const update of updates) {
        console.log(`Updating ${update.name}...`);
        const { data, error } = await supabase
            .from('products')
            .update({ images: update.images })
            .ilike('name', `%${update.name}%`);

        if (error) {
            console.error(`Error updating ${update.name}:`, error.message);
        } else {
            console.log(`Successfully updated ${update.name}`);
        }
    }

    console.log("Force updates complete.");
}

fixImagesForce();
