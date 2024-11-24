import Shopify from 'shopify-api-node'

if (!process.env.SHOPIFY_SHOP_NAME || !process.env.SHOPIFY_ACCESS_TOKEN) {
  throw new Error('Shopify credentials are not defined')
}

export const shopifyClient = new Shopify({
  shopName: process.env.SHOPIFY_SHOP_NAME,
  accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
  apiVersion: '2024-01'
}) 

interface ShopifyProduct {
  id: string;
  title: string;
  variants: {
    edges: Array<{
      node: {
        id: string;
        price: string;
        inventoryQuantity: number;
      };
    }>;
  };
}

export async function getShopifyProducts(): Promise<{ products: { edges: Array<{ node: ShopifyProduct }> } }> {
  const response = await shopifyClient.graphql(`
    query {
      products(first: 100) {
        edges {
          node {
            id
            title
            variants(first: 1) {
              edges {
                node {
                  id
                  price
                  inventoryQuantity
                }
              }
            }
          }
        }
      }
    }
  `);
  
  return response;
} 