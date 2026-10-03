import productsData from "../data/products.json";
import categoriesData from "../data/categories.json";

import {
  getStoredProducts,
  getStoredCategories,
  saveProducts,
  saveCategories,
  getRFQs,
  saveRFQs
} from "./storage.js";

const initialSampleRFQs = [
  {
    id: "RFQ-1024",
    customer: {
      companyName: "Apex Logistics & Supplies",
      contactPerson: "Rajesh Sharma",
      mobile: "+91 98250 12345",
      email: "procurement@apexlogistics.in",
      gstNumber: "24AAACA1234A1Z5",
      address: "GIDC Naroda, Ahmedabad, Gujarat"
    },
    products: [
      {
        productId: "prod-003",
        productName: "Industrial Safety Helmet",
        variantId: "var-008",
        variant: { size: "Universal", color: "Yellow", material: "ABS" },
        quantity: 50,
        moq: 25
      },
      {
        productId: "prod-004",
        productName: "Protective Industrial Gloves",
        variantId: "var-012",
        variant: { size: "L", color: "Grey", material: "Nylon" },
        quantity: 200,
        moq: 100
      }
    ],
    message: "Requirement for ongoing manufacturing facility expansion.",
    status: "Pending",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: "RFQ-1025",
    customer: {
      companyName: "Gujarat Textiles & Uniforms",
      contactPerson: "Priya Mehta",
      mobile: "+91 94280 67890",
      email: "priya@gujarattextiles.com",
      gstNumber: "24BBBCB5678B1Z2",
      address: "Ring Road, Surat, Gujarat"
    },
    products: [
      {
        productId: "prod-001",
        productName: "Premium Cotton T-Shirt",
        variantId: "var-002",
        variant: { size: "M", color: "Black", material: "Cotton" },
        quantity: 150,
        moq: 50
      },
      {
        productId: "prod-002",
        productName: "Formal Business Shirt",
        variantId: "var-005",
        variant: { size: "M", color: "White", material: "Cotton Blend" },
        quantity: 60,
        moq: 30
      }
    ],
    message: "Corporate uniform bulk supply quotation needed.",
    status: "Reviewed",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: "RFQ-1026",
    customer: {
      companyName: "Shreeji Packaging Solutions",
      contactPerson: "Amit Shah",
      mobile: "+91 98980 11223",
      email: "orders@shreejipack.com",
      gstNumber: "24CCCC1234C1Z9",
      address: "Makarpura GIDC, Vadodara, Gujarat"
    },
    products: [
      {
        productId: "prod-008",
        productName: "Corrugated Shipping Box",
        variantId: "var-022",
        variant: { size: "Medium", color: "Brown", material: "Corrugated Paper" },
        quantity: 500,
        moq: 100
      },
      {
        productId: "prod-009",
        productName: "Stretch Packaging Film",
        variantId: "var-024",
        variant: { size: "500 mm", color: "Transparent", material: "LLDPE" },
        quantity: 100,
        moq: 50
      }
    ],
    message: "Monthly recurring packaging requirement quotation.",
    status: "Quoted",
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
  }
];

export function initializeDemoData() {
  const products = getStoredProducts(null);
  const categories = getStoredCategories(null);
  const rfqs = getRFQs();

  if (!products) {
    saveProducts(productsData);
  }

  if (!categories) {
    saveCategories(categoriesData);
  }

  if (!rfqs || rfqs.length === 0) {
    saveRFQs(initialSampleRFQs);
  }
}

export function getDemoProducts() {
  return getStoredProducts(productsData);
}

export function getDemoCategories() {
  return getStoredCategories(categoriesData);
}
