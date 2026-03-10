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

async function fixImages() {
    const env = getEnv();
    const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        console.error("Missing Supabase credentials");
        return;
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const updates = [
        { slug: 'pen', images: ['/images/modern_titanium_pen.png'] },
        { slug: 'leather-mag-wallet-find-my-tracking', images: ['/images/leather_mag_wallet.png'] },
        { slug: 'kevlar-cable-3m', images: ['/images/rugged_kevlar_cable.png'] },
        { slug: 'modern-passport-wallet', images: ['/images/modern_passport_wallet.png'] },
        { slug: 'rugged-archive-wallet', images: ['/images/rugged_case_orange.png'] }, // Reusing rugged case for rugged wallet context or just keeping it
        { slug: 'modern-leather-case-17', images: ['/images/modern_leather_case_brown.png'] },
        { slug: 'modern-leather-case', images: ['/images/modern_leather_case_brown.png'] },
        { slug: 'card-wallet-plus', images: ['/images/leather_mag_wallet.png'] },
        { slug: 'bifold-wallet', images: ['/images/modern_passport_wallet.png'] },
        { slug: 'stand-wallet', images: ['/images/leather_mag_wallet.png'] }
    ];

    console.log("Starting database updates...");

    for (const update of updates) {
        const { data, error } = await supabase
            .from('products')
            .update({ images: update.images })
            .eq('slug', update.slug);

        if (error) {
            console.error(`Error updating ${update.slug}:`, error.message);
        } else {
            console.log(`Successfully updated ${update.slug}`);
        }
    }

    console.log("Database updates complete.");
}

fixImages();
