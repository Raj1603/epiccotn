
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
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDuplicates() {
    console.log('--- Checking Categories for Duplicates ---');

    const { data: categories, error } = await supabase
        .from('categories')
        .select('id, name, slug, parent_id');

    if (error) {
        console.error(error);
        return;
    }

    const counts = {};
    categories.forEach(c => {
        // Only care about top-level categories for the menu
        if (!c.parent_id) {
            counts[c.name] = (counts[c.name] || 0) + 1;
        }
    });

    console.log('Top-level Category Counts (Name):', counts);

    const duplicates = Object.keys(counts).filter(name => counts[name] > 1);
    if (duplicates.length > 0) {
        console.log('Found duplicates:', duplicates);
        // List details
        console.log('Details:', categories.filter(c => duplicates.includes(c.name) && !c.parent_id));
    } else {
        console.log('No top-level duplicates found.');
    }
}

checkDuplicates();
