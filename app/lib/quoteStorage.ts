export type SavedQuote = {
  id: string;
  createdAt: string;
  customer: string;
  logoName: string;
  quantity: number;
  stitches: number;
  aiPrice: number;
  sellingPrice: number;
  totalCost: number;
  revenue: number;
  profit: number;
};

const STORAGE_KEY = "toora_quotes";

export function loadQuotes(): SavedQuote[] {
  if (typeof window === "undefined") return [];

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as SavedQuote[];
  } catch {
    return [];
  }
}

export function saveQuote(quote: SavedQuote) {
  const quotes = loadQuotes();
  quotes.unshift(quote);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));
}

export function deleteQuote(id: string) {
  const quotes = loadQuotes().filter((quote) => quote.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));
}

export function generateQuoteId() {
  const quotes = loadQuotes();
  const id = quotes.length + 1;
  return "BG" + id.toString().padStart(5, "0");
}