import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { shopifyClient } from "@/lib/shopify";

export default async function DashboardPage() {
  const session = await auth();
  
  if (!session?.userId) {
    redirect("/sign-in");
  }

  let shopifyStatus = 'Connected';
  try {
    // Test the connection
    await shopifyClient.graphql('query { shop { name } }');
  } catch (err) {
    console.error('Shopify connection error:', err);
    shopifyStatus = 'Error connecting to Shopify: ' + err;
  }

  return (
    <DashboardShell>
      <div className="mb-8 p-4 bg-white rounded-lg border">
        <h2 className="text-lg font-semibold mb-2">Shopify Connection Status</h2>
        <p className={`${shopifyStatus === 'Connected' ? 'text-green-600' : 'text-red-600'}`}>
          {shopifyStatus}
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* ... existing stats cards ... */}
      </div>
    </DashboardShell>
  );
}