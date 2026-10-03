const STORAGE_KEYS = {
  QUOTATION_CART: "kse_demo_quotation_cart",
  RFQS: "kse_demo_rfqs",
  ENQUIRIES: "kse_demo_enquiries",
  PRODUCTS: "kse_demo_products",
  CATEGORIES: "kse_demo_categories",
  ADMIN_SESSION: "kse_demo_admin_session"
};

function readStorage(key, fallback = null) {
  try {
    const value = localStorage.getItem(key);

    if (value === null) {
      return fallback;
    }

    return JSON.parse(value);
  } catch (error) {
    console.error(`Failed to read LocalStorage key: ${key}`, error);
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Failed to write LocalStorage key: ${key}`, error);
    return false;
  }
}

function removeStorage(key) {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Failed to remove LocalStorage key: ${key}`, error);
    return false;
  }
}

/* =========================
   QUOTATION CART
========================= */

export function getQuotationCart() {
  return readStorage(STORAGE_KEYS.QUOTATION_CART, []);
}

export function saveQuotationCart(cart) {
  return writeStorage(STORAGE_KEYS.QUOTATION_CART, cart);
}

export function clearQuotationCart() {
  return removeStorage(STORAGE_KEYS.QUOTATION_CART);
}

/* =========================
   RFQs
========================= */

export function getRFQs() {
  return readStorage(STORAGE_KEYS.RFQS, []);
}

export function saveRFQs(rfqs) {
  return writeStorage(STORAGE_KEYS.RFQS, rfqs);
}

export function addRFQ(rfq) {
  const rfqs = getRFQs();

  const updatedRFQs = [rfq, ...rfqs];

  saveRFQs(updatedRFQs);

  return rfq;
}

/* =========================
   ENQUIRIES
========================= */

export function getEnquiries() {
  return readStorage(STORAGE_KEYS.ENQUIRIES, []);
}

export function saveEnquiries(enquiries) {
  return writeStorage(STORAGE_KEYS.ENQUIRIES, enquiries);
}

export function addEnquiry(enquiry) {
  const enquiries = getEnquiries();

  const updatedEnquiries = [enquiry, ...enquiries];

  saveEnquiries(updatedEnquiries);

  return enquiry;
}

/* =========================
   PRODUCTS
========================= */

export function getStoredProducts(defaultProducts = []) {
  return readStorage(
    STORAGE_KEYS.PRODUCTS,
    defaultProducts
  );
}

export function saveProducts(products) {
  return writeStorage(
    STORAGE_KEYS.PRODUCTS,
    products
  );
}

/* =========================
   CATEGORIES
========================= */

export function getStoredCategories(defaultCategories = []) {
  return readStorage(
    STORAGE_KEYS.CATEGORIES,
    defaultCategories
  );
}

export function saveCategories(categories) {
  return writeStorage(
    STORAGE_KEYS.CATEGORIES,
    categories
  );
}

/* =========================
   ADMIN SESSION
========================= */

export function getAdminSession() {
  return readStorage(
    STORAGE_KEYS.ADMIN_SESSION,
    null
  );
}

export function saveAdminSession(session) {
  return writeStorage(
    STORAGE_KEYS.ADMIN_SESSION,
    session
  );
}

export function clearAdminSession() {
  return removeStorage(
    STORAGE_KEYS.ADMIN_SESSION
  );
}

/* =========================
   CLEAR ALL DEMO DATA
========================= */

export function clearAllDemoStorage() {
  Object.values(STORAGE_KEYS).forEach((key) => {
    removeStorage(key);
  });
}

export { STORAGE_KEYS };
