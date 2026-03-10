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

async function debugProducts() {
    const env = getEnv();
    const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        console.error("Missing Supabase credentials in .env.local");
        return;
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log("Fetching products...");
    const { data: products, error } = await supabase
        .from('products')
        .select('*');

    if (error) {
        console.error("Error fetching products:", error);
        return;
    }

    const targets = products.filter(p =>
        ['pen', 'leather-mag-wallet-find-my-tracking', 'kevlar-cable-3m', 'modern-passport-wallet', 'rugged-archive-wallet', 'modern-leather-case-17'].includes(p.slug)
    );

    console.log("Current status of target products:");
    for (const p of targets) {
        console.log(`---`);
        console.log(`ID: ${p.id}`);
        console.log(`Name: ${p.name}`);
        console.log(`Slug: ${p.slug}`);
        console.log(`Images: ${JSON.stringify(p.images)}`);
    }

    const outputPath = path.join(process.cwd(), 'scripts/products_dump.json');
    fs.writeFileSync(outputPath, JSON.stringify(products, null, 2));
}

debugProducts();
