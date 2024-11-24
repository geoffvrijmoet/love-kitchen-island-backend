import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { shopifyClient } from "@/lib/shopify";

async function getStoreMetrics() {
  const query = `
    query {
      shop {
        name
        email
        myshopifyDomain
        productVendors(first: 10) {
          edges {
            node
          }
        }
        products(first: 5) {
          edges {
            node {
              id
              title
              totalInventory
              priceRangeV2 {
                minVariantPrice {
                  amount
                }
              }
            }
          }
        }
        orders(first: 5, sortKey: CREATED_AT, reverse: true) {
          edges {
            node {
              id
              totalPriceSet {
                shopMoney {
                  amount
                }
              }
              createdAt
            }
          }
        }
      }
    }
  `;

  return shopifyClient.request(query);
}

export default async function HomePage() {
  const session = await auth();
  
  if (!session?.userId) {
    redirect("/sign-in");
  }

  const data = await getStoreMetrics();
  const { shop } = data;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome to {shop.name} Admin
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Store Domain: {shop.myshopifyDomain}
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Recent Products */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <h3 className="text-lg font-medium text-gray-900">Recent Products</h3>
              <ul className="mt-4 space-y-4">
                {shop.products.edges.map(({ node }) => (
                  <li key={node.id} className="flex justify-between">
                    <span className="truncate">{node.title}</span>
                    <span className="text-gray-500">
                      ${parseFloat(node.priceRangeV2.minVariantPrice.amount).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
              <ul className="mt-4 space-y-4">
                {shop.orders.edges.map(({ node }) => (
                  <li key={node.id} className="flex justify-between">
                    <span className="text-gray-500">
                      {new Date(node.createdAt).toLocaleDateString()}
                    </span>
                    <span>
                      ${parseFloat(node.totalPriceSet.shopMoney.amount).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Vendors */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <h3 className="text-lg font-medium text-gray-900">Active Vendors</h3>
              <ul className="mt-4 space-y-2">
                {shop.productVendors.edges.map(({ node }, index) => (
                  <li key={index} className="text-gray-600">
                    {node}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
