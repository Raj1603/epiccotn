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

async function verifyUpdates() {
    const env = getEnv();
    const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const slugs = [
        'pen',
        'leather-mag-wallet-find-my-tracking',
        'kevlar-cable-3m',
        'modern-passport-wallet',
        'rugged-archive-wallet',
        'modern-leather-case-17'
    ];

    console.log("Verifying specific product images...");
    for (const slug of slugs) {
        const { data, error } = await supabase
            .from('products')
            .select('name, images')
            .eq('slug', slug)
            .single();

        if (error) {
            console.log(`- ${slug}: Error - ${error.message}`);
        } else {
            console.log(`- ${data.name} (${slug}): ${JSON.stringify(data.images)}`);
        }
    }
}

verifyUpdates();
