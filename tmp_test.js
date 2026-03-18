const SUPABASE_URL = "https://dpjyevfwiwkcdgbmqsmg.supabase.co";
const ANON_KEY = "sb_publishable_mJwYlBbxb7taPqq-aMDzoQ_BGo0vmE9";

async function testSubscription() {
    console.log("Testing Supabase Subscription Insert...");
    const res = await fetch(`${SUPABASE_URL}/rest/v1/newsletter_subscribers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "apikey": ANON_KEY,
            "Authorization": `Bearer ${ANON_KEY}`,
            "Prefer": "return=minimal"
        },
        body: JSON.stringify({ email: "test_bot_" + Date.now() + "@example.com" })
    });

    const data = await res.json();
    if (!res.ok) {
        console.error("Test Failed:", data);
    } else {
        console.log("Test Succeeded! Inserted:", data);
    }
}

testSubscription();
