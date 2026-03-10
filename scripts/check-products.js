
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load env vars manually
try {
    const envPath = path.resolve(__dirname, '../.env.local');
    if (fs.existsSync(envPath)) {
        const envConfig = fs.readFileSync(envPath, 'utf8');
        envConfig.split(/\r?\n/).forEach(line => {
            const parts = line.split('=');
            if (parts.length >= 2) {
                const key = parts[0].trim();
                const value = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
                if (key && value) process.env[key] = value;
            }
        });
    }
} catch (e) {
    console.error('Error loading .env.local', e);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProducts() {
    console.log('--- Checking Products ---');

    const { data: products, error } = await supabase
        .from('products')
        .select('id, name, category:categories(slug), images');

    if (error) {
        console.error(error);
        return;
    }

    console.log('Total Products:', products.length);
    products.forEach(p => {
        // category is an object now due to join, or null
        const catSlug = p.category ? p.category.slug : 'null';
        console.log(`[${catSlug}] ${p.name}: ${p.images?.[0]}`);
    });
}

checkProducts();
