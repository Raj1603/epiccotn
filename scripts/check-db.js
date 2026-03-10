
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

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase environment variables. Make sure .env.local exists.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkData() {
    console.log('--- Checking Database State ---');

    // Check Products
    const { data: products, error: prodError } = await supabase.from('products').select('name, category_id, categories(name)');
    if (prodError) console.error('Error checking products:', prodError.message);
    else {
        console.log(`Products Count: ${products.length}`);
        products.forEach(p => {
            console.log(`- [${p.categories?.name || 'No Category'}] ${p.name}`);
        });
    }

    // Check Categories
    const { count: catCount, error: catError } = await supabase.from('categories').select('*', { count: 'exact', head: true });
    if (catError) console.error('Error checking categories:', catError.message);
    else console.log(`Categories Count: ${catCount}`);

    // Check Notifications (if logic exists yet?)
    const { count: notifCount, error: notifError } = await supabase.from('notifications').select('*', { count: 'exact', head: true });
    if (notifError) console.log('Notifications table likely does not exist yet (Error: ' + notifError.message + ')');
    else console.log(`Notifications Count: ${notifCount}`);
}

checkData();
