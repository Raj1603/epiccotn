
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing env vars');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function listProducts() {
    const { data: products, error } = await supabase
        .from('products')
        .select('name, slug, category_id, categories(name, slug)')
        .order('name');

    if (error) {
        console.error(error);
        return;
    }

    console.log('--- ALL PRODUCTS IN DB ---');
    products.forEach(p => {
        console.log(`- [${p.categories?.name || 'No Category'}] ${p.name} (${p.slug})`);
    });
}

listProducts();
