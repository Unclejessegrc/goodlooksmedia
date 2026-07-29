import { useMemo, useState, type ChangeEvent } from "react";
import {
  CheckCircle,
  ChevronDown,
  ChevronUp,
  FileDown,
  Info,
  Plus,
  Trash2,
} from "lucide-react";

import glmgLogo from "@/assets/glmg-logo.png";

type PackageOption = {
  cat: string;
  label: string;
  name: string;
  low: number;
  high: number | null;
  bestFit?: boolean;
};

type AddonOption = {
  name: string;
  value: number;
};

type BusinessInfo = {
  name: string;
  tagline: string;
  address: string;
  email: string;
  phone: string;
  logo: string;
};

type ClientInfo = {
  name: string;
  company: string;
  address: string;
  email: string;
};

type InvoiceMeta = {
  number: string;
  date: string;
  due: string;
};

type LineItem = {
  id: number;
  description: string;
  value: number;
  qty: number;
};

type InvoiceData = {
  biz: BusinessInfo;
  client: ClientInfo;
  meta: InvoiceMeta;
  lineItems: LineItem[];
  subtotal: number;
  yourPrice: number;
  savings: number;
  taxRate: number;
  taxAmount: number;
  totalDue: number;
  notes: string;
};

// Packages verified from https://www.goodlooksmedia.com/packages
// Values are published STARTING investments. Ranges are shown for reference.
const PACKAGES: PackageOption[] = [
  { cat: "Business & Brand Video", label: "Business Video", name: "Brand Foundation", low: 1200, high: 1800 },
  { cat: "Business & Brand Video", label: "Business Video", name: "Brand Builder", low: 1200, high: 2200, bestFit: true },
  { cat: "Business & Brand Video", label: "Business Video", name: "Campaign Kit", low: 2800, high: 4500 },

  { cat: "Real Estate Media", label: "Real Estate Media", name: "Property Showcase", low: 650, high: null },
  { cat: "Real Estate Media", label: "Real Estate Media", name: "Cinematic Lifestyle", low: 750, high: null, bestFit: true },
  { cat: "Real Estate Media", label: "Real Estate Media", name: "Agent Brand Campaign", low: 1500, high: null },

  { cat: "Weddings", label: "Wedding Film", name: "Teaser", low: 1200, high: 1800 },
  { cat: "Weddings", label: "Wedding Film", name: "Highlight", low: 2400, high: 3200, bestFit: true },
  { cat: "Weddings", label: "Wedding Film", name: "Full Story", low: 3800, high: 5000 },

  { cat: "Events", label: "Event Coverage", name: "Event Essentials", low: 800, high: 1200 },
  { cat: "Events", label: "Event Coverage", name: "Main Event", low: 1400, high: 2000, bestFit: true },
  { cat: "Events", label: "Event Coverage", name: "Full Story", low: 2200, high: 3200 },

  { cat: "Artist Visuals", label: "Artist Visuals", name: "Performance Film", low: 900, high: 1400 },
  { cat: "Artist Visuals", label: "Artist Visuals", name: "Visual Story", low: 1600, high: 2400, bestFit: true },
  { cat: "Artist Visuals", label: "Artist Visuals", name: "Campaign Kit", low: 2400, high: 3800 },
];

// Named add-ons from the site's pricing FAQ. No public prices, so value entered manually.
const BASE_ADDONS: AddonOption[] = [
  { name: "Rush delivery", value: 0 },
  { name: "Raw footage files", value: 0 },
  { name: "Extra revision round", value: 0 },
  { name: "Additional format or aspect ratio", value: 0 },
  { name: "Extended coverage (per hour)", value: 0 },
  { name: "Drone / aerial footage", value: 0 },
  { name: "Travel beyond standard service area", value: 0 },
];

const CATS = [...new Set(PACKAGES.map((p) => p.cat))];

const rangeLabel = (p: PackageOption) =>
  p.high ? `$${p.low.toLocaleString()} to $${p.high.toLocaleString()}` : `Starting at $${p.low.toLocaleString()}`;

const invoiceLabel = (p: PackageOption) => `${p.name} (${p.label})`;

const usd = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number.isFinite(n) ? n : 0);

function escapeHtml(s: string | number | null | undefined) {
  if (s == null) return "";
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildInvoiceHTML(d: InvoiceData) {
  const { biz, client, meta, lineItems, subtotal, yourPrice, savings, taxRate, taxAmount, totalDue, notes } = d;

  const rowsHTML = lineItems
    .map(
      (li) => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-size:13px;color:#111827;">${escapeHtml(li.description) || "Service"}${li.qty > 1 ? ` (x${li.qty})` : ""}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;font-size:13px;color:#111827;text-align:right;white-space:nowrap;">${usd(li.value * li.qty)}</td>
      </tr>`
    )
    .join("");

  const savingsRow = savings > 0
    ? `<tr><td style="padding:6px 12px;font-size:13px;color:#047857;text-align:right;">You Saved</td><td style="padding:6px 12px;font-size:13px;color:#047857;text-align:right;font-weight:bold;white-space:nowrap;">- ${usd(savings)}</td></tr>`
    : "";

  const taxRow = taxRate > 0
    ? `<tr><td style="padding:6px 12px;font-size:13px;color:#374151;text-align:right;">Tax (${taxRate}%)</td><td style="padding:6px 12px;font-size:13px;color:#111827;text-align:right;white-space:nowrap;">${usd(taxAmount)}</td></tr>`
    : "";

  return `
  <div style="font-family:Arial, Helvetica, sans-serif;max-width:720px;margin:0 auto;color:#111827;">
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      <tr>
        <td style="vertical-align:top;">
          ${biz.logo ? `<img src="${biz.logo}" alt="${escapeHtml(biz.name)}" style="max-height:84px;max-width:280px;margin-bottom:8px;" />` : `<div style="font-size:26px;font-weight:bold;letter-spacing:0.5px;color:#0f172a;">${escapeHtml(biz.name)}</div>`}
          <div style="font-size:12px;color:#64748b;margin-top:2px;">${escapeHtml(biz.tagline)}</div>
          <div style="font-size:12px;color:#374151;margin-top:10px;line-height:1.6;">
            ${escapeHtml(biz.address) ? escapeHtml(biz.address) + "<br>" : ""}
            ${escapeHtml(biz.email) ? escapeHtml(biz.email) + "<br>" : ""}
            ${escapeHtml(biz.phone) ? escapeHtml(biz.phone) : ""}
          </div>
        </td>
        <td style="vertical-align:top;text-align:right;">
          <div style="font-size:30px;font-weight:bold;color:#0f172a;letter-spacing:2px;">INVOICE</div>
          <div style="font-size:12px;color:#374151;margin-top:10px;line-height:1.7;">
            <strong>Invoice #:</strong> ${escapeHtml(meta.number)}<br>
            <strong>Date:</strong> ${escapeHtml(meta.date)}<br>
            <strong>Due:</strong> ${escapeHtml(meta.due)}
          </div>
        </td>
      </tr>
    </table>

    <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
      <tr><td style="vertical-align:top;">
        <div style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;margin-bottom:6px;">Bill To</div>
        <div style="font-size:13px;color:#111827;line-height:1.7;">
          <strong>${escapeHtml(client.name) || "Client Name"}</strong><br>
          ${escapeHtml(client.company) ? escapeHtml(client.company) + "<br>" : ""}
          ${escapeHtml(client.address) ? escapeHtml(client.address) + "<br>" : ""}
          ${escapeHtml(client.email) ? escapeHtml(client.email) : ""}
        </div>
      </td></tr>
    </table>

    <table style="width:100%;border-collapse:collapse;margin-bottom:8px;">
      <thead><tr>
        <th style="text-align:left;padding:10px 12px;background:#0f172a;color:#ffffff;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Description</th>
        <th style="text-align:right;padding:10px 12px;background:#0f172a;color:#ffffff;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Value</th>
      </tr></thead>
      <tbody>${rowsHTML}</tbody>
    </table>

    <table style="width:100%;border-collapse:collapse;margin-top:8px;">
      <tr>
        <td style="width:55%;"></td>
        <td style="width:45%;">
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:6px 12px;font-size:13px;color:#374151;text-align:right;">Total Value</td><td style="padding:6px 12px;font-size:13px;color:#111827;text-align:right;white-space:nowrap;">${usd(subtotal)}</td></tr>
            <tr><td style="padding:6px 12px;font-size:13px;color:#374151;text-align:right;">Your Price</td><td style="padding:6px 12px;font-size:13px;color:#111827;text-align:right;white-space:nowrap;">${usd(yourPrice)}</td></tr>
            ${savingsRow}
            ${taxRow}
            <tr><td style="padding:12px;font-size:15px;color:#0f172a;text-align:right;font-weight:bold;border-top:2px solid #0f172a;">Total Due</td><td style="padding:12px;font-size:15px;color:#0f172a;text-align:right;font-weight:bold;border-top:2px solid #0f172a;white-space:nowrap;">${usd(totalDue)}</td></tr>
          </table>
        </td>
      </tr>
    </table>

    ${escapeHtml(notes) ? `<div style="margin-top:24px;padding-top:16px;border-top:1px solid #e5e7eb;"><div style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#94a3b8;margin-bottom:6px;">Notes</div><div style="font-size:12px;color:#374151;line-height:1.6;">${escapeHtml(notes).replace(/\n/g, "<br>")}</div></div>` : ""}

    <div style="margin-top:28px;text-align:center;font-size:12px;color:#64748b;">Thank you for your business.</div>
  </div>`;
}

function downloadWord(innerHTML: string, filename: string) {
  const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Invoice</title></head><body>";
  const source = header + innerHTML + "</body></html>";
  const blob = new Blob(["\ufeff", source], { type: "application/msword" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function todayStr(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function defaultInvoiceNumber() {
  const d = new Date();
  return `GLMG-${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}-001`;
}

export default function InvoiceGenerator() {
  const [showPrices, setShowPrices] = useState(false);

  const [biz, setBiz] = useState<BusinessInfo>({
    name: "Good Looks Media Group",
    tagline: "Strategic Rhode Island Video Production",
    address: "Warwick, Rhode Island",
    email: "goodlooksmediagroup@gmail.com",
    phone: "401-895-6365",
    logo: glmgLogo,
  });
  const handleLogo = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setBiz((b) => ({ ...b, logo: reader.result }));
      }
    };
    reader.readAsDataURL(file);
  };
  const [client, setClient] = useState<ClientInfo>({ name: "", company: "", address: "", email: "" });
  const [meta, setMeta] = useState<InvoiceMeta>({ number: defaultInvoiceNumber(), date: todayStr(0), due: todayStr(14) });

  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [pkgPick, setPkgPick] = useState("");
  const [addonPick, setAddonPick] = useState("");
  const [yourPriceInput, setYourPriceInput] = useState("");
  const [taxRateInput, setTaxRateInput] = useState("0");
  const [notes, setNotes] = useState("Payment due within 14 days. Thank you.");

  const addonOptions = BASE_ADDONS;

  const addLine = (description: string, value: string | number) =>
    setLineItems((prev) => [...prev, { id: Date.now() + Math.random(), description, value: Number(value) || 0, qty: 1 }]);

  const addPackage = () => {
    const p = PACKAGES.find((x) => x.name + "|" + x.cat === pkgPick);
    if (p) addLine(invoiceLabel(p), p.low);
    setPkgPick("");
  };
  const addAddon = () => {
    const a = addonOptions.find((x) => x.name === addonPick);
    if (a) addLine(a.name, a.value);
    setAddonPick("");
  };

  const updateLine = (id: number, field: "description" | "value" | "qty", val: string) =>
    setLineItems((prev) =>
      prev.map((li) => (li.id === id ? { ...li, [field]: field === "description" ? val : Number(val) || 0 } : li))
    );
  const removeLine = (id: number) => setLineItems((prev) => prev.filter((li) => li.id !== id));

  const subtotal = useMemo(() => lineItems.reduce((s, li) => s + li.value * (li.qty || 1), 0), [lineItems]);
  const yourPrice = yourPriceInput.trim() === "" ? subtotal : Number(yourPriceInput.replace(/[$,]/g, "")) || 0;
  const taxRate = Number(taxRateInput) || 0;
  const savings = Math.max(0, subtotal - yourPrice);
  const taxAmount = yourPrice * (taxRate / 100);
  const totalDue = yourPrice + taxAmount;

  const invoiceData = { biz, client, meta, lineItems, subtotal, yourPrice, savings, taxRate, taxAmount, totalDue, notes };

  const handleDownload = () => {
    const html = buildInvoiceHTML(invoiceData);
    const safe = (meta.number || "invoice").replace(/[^\w-]/g, "_");
    downloadWord(html, `${safe}.doc`);
  };

  const input = "w-full px-3 py-2 rounded-md border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400";
  const label = "block text-xs font-medium text-slate-500 mb-1 uppercase tracking-wide";
  const card = "bg-white rounded-xl border border-slate-200 p-5 shadow-sm";

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5">
          <h1 className="text-2xl font-bold text-slate-900">GLMG Invoice Generator</h1>
          <p className="mt-1 text-sm text-slate-500">
            Pick a package and add-ons, set the actual price, then download an editable Word invoice.
          </p>
        </div>

        <div className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-emerald-800">
              <CheckCircle size={16} />
              Packages loaded from goodlooksmedia.com.
            </div>
            <button type="button" onClick={() => setShowPrices((s) => !s)} className="flex items-center gap-1 text-sm font-medium text-emerald-800 hover:text-emerald-900">
              Review prices {showPrices ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>
          </div>
          {showPrices && (
            <div className="mt-3 max-h-60 overflow-auto rounded border border-emerald-200 bg-white">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-emerald-100 text-emerald-900">
                  <tr><th className="px-3 py-2 text-left">Package</th><th className="px-3 py-2 text-left">Lane</th><th className="px-3 py-2 text-right">Published</th></tr>
                </thead>
                <tbody>
                  {PACKAGES.map((p, i) => (
                    <tr key={i} className="border-t border-slate-100">
                      <td className="px-3 py-1.5 text-slate-800">{p.name}{p.bestFit ? " (best fit)" : ""}</td>
                      <td className="px-3 py-1.5 text-slate-500">{p.label}</td>
                      <td className="px-3 py-1.5 text-right text-slate-800">{rangeLabel(p)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="space-y-5">
            <div className={card}>
              <h2 className="mb-3 text-sm font-semibold text-slate-800">Your Business</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className={label}>Logo</label>
                  <div className="flex items-center gap-3">
                    <img src={biz.logo} alt="Good Looks Media Group logo" className="h-12 object-contain" />
                    <label className="cursor-pointer rounded-md bg-slate-900 px-3 py-2 text-sm text-white hover:bg-slate-700">
                      Replace
                      <input type="file" accept="image/*" className="hidden" onChange={handleLogo} />
                    </label>
                  </div>
                </div>
                <div className="col-span-2"><label className={label}>Business Name</label><input className={input} value={biz.name} onChange={(e) => setBiz({ ...biz, name: e.target.value })} /></div>
                <div className="col-span-2"><label className={label}>Tagline</label><input className={input} value={biz.tagline} onChange={(e) => setBiz({ ...biz, tagline: e.target.value })} /></div>
                <div className="col-span-2"><label className={label}>Address</label><input className={input} value={biz.address} onChange={(e) => setBiz({ ...biz, address: e.target.value })} /></div>
                <div><label className={label}>Email</label><select className={input} value={biz.email} onChange={(e) => setBiz({ ...biz, email: e.target.value })}><option value="goodlooksmediagroup@gmail.com">goodlooksmediagroup@gmail.com</option></select></div>
                <div><label className={label}>Phone</label><input className={input} value={biz.phone} onChange={(e) => setBiz({ ...biz, phone: e.target.value })} /></div>
              </div>
            </div>

            <div className={card}>
              <h2 className="mb-3 text-sm font-semibold text-slate-800">Client & Invoice Details</h2>
              <div className="grid grid-cols-2 gap-3">
                <div><label className={label}>Client Name</label><input className={input} value={client.name} onChange={(e) => setClient({ ...client, name: e.target.value })} /></div>
                <div><label className={label}>Company</label><input className={input} value={client.company} onChange={(e) => setClient({ ...client, company: e.target.value })} /></div>
                <div className="col-span-2"><label className={label}>Client Address</label><input className={input} value={client.address} onChange={(e) => setClient({ ...client, address: e.target.value })} /></div>
                <div className="col-span-2"><label className={label}>Client Email</label><input className={input} value={client.email} onChange={(e) => setClient({ ...client, email: e.target.value })} /></div>
                <div><label className={label}>Invoice #</label><input className={input} value={meta.number} onChange={(e) => setMeta({ ...meta, number: e.target.value })} /></div>
                <div><label className={label}>Date</label><input className={input} value={meta.date} onChange={(e) => setMeta({ ...meta, date: e.target.value })} /></div>
                <div className="col-span-2"><label className={label}>Due Date</label><input className={input} value={meta.due} onChange={(e) => setMeta({ ...meta, due: e.target.value })} /></div>
              </div>
            </div>

            <div className={card}>
              <h2 className="mb-3 text-sm font-semibold text-slate-800">Services</h2>
              <div className="mb-4 space-y-3">
                <div>
                  <label className={label}>Add a Package</label>
                  <div className="flex gap-2">
                    <select className={input} value={pkgPick} onChange={(e) => setPkgPick(e.target.value)}>
                      <option value="">Select a package...</option>
                      {CATS.map((c) => (
                        <optgroup key={c} label={c}>
                          {PACKAGES.filter((p) => p.cat === c).map((p, i) => (
                            <option key={i} value={p.name + "|" + p.cat}>
                              {p.name} ({rangeLabel(p)})
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                    <button type="button" onClick={addPackage} className="flex shrink-0 items-center gap-1 rounded-md bg-slate-900 px-3 text-sm text-white hover:bg-slate-700"><Plus size={15} /> Add</button>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">Loads at the published starting price. Edit the Value field to match the real scope.</p>
                </div>

                <div>
                  <label className={label}>Add an Add-on</label>
                  <div className="flex gap-2">
                    <select className={input} value={addonPick} onChange={(e) => setAddonPick(e.target.value)}>
                      <option value="">Select an add-on...</option>
                      {addonOptions.map((a, i) => (
                        <option key={i} value={a.name}>{a.name}{a.value ? ` (${usd(a.value)})` : " (enter price)"}</option>
                      ))}
                    </select>
                    <button type="button" onClick={addAddon} className="flex shrink-0 items-center gap-1 rounded-md bg-slate-900 px-3 text-sm text-white hover:bg-slate-700"><Plus size={15} /> Add</button>
                  </div>
                </div>

                <button type="button" onClick={() => addLine("", 0)} className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900"><Plus size={14} /> Add custom line</button>
              </div>

              <div className="overflow-hidden rounded-lg border border-slate-200">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr><th className="px-2 py-2 text-left font-medium">Description</th><th className="w-24 px-2 py-2 text-right font-medium">Value</th><th className="w-14 px-2 py-2 text-center font-medium">Qty</th><th className="w-8"></th></tr>
                  </thead>
                  <tbody>
                    {lineItems.length === 0 && (
                      <tr><td colSpan={4} className="px-3 py-4 text-center text-sm text-slate-400">No services added yet.</td></tr>
                    )}
                    {lineItems.map((li) => (
                      <tr key={li.id} className="border-t border-slate-100">
                        <td className="px-2 py-1.5"><input className="w-full rounded border border-slate-200 px-2 py-1 text-sm" value={li.description} placeholder="Service description" onChange={(e) => updateLine(li.id, "description", e.target.value)} /></td>
                        <td className="px-2 py-1.5"><input className="w-full rounded border border-slate-200 px-2 py-1 text-right text-sm" type="number" value={li.value} onChange={(e) => updateLine(li.id, "value", e.target.value)} /></td>
                        <td className="px-2 py-1.5"><input className="w-full rounded border border-slate-200 px-2 py-1 text-center text-sm" type="number" min="1" value={li.qty} onChange={(e) => updateLine(li.id, "qty", e.target.value)} /></td>
                        <td className="px-1 py-1.5 text-center"><button type="button" onClick={() => removeLine(li.id)} className="text-slate-400 hover:text-red-500"><Trash2 size={15} /></button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className={card}>
              <h2 className="mb-3 text-sm font-semibold text-slate-800">Pricing</h2>
              <div className="grid grid-cols-2 gap-3">
                <div><label className={label}>Total Value (auto)</label><div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">{usd(subtotal)}</div></div>
                <div><label className={label}>Actual Price Charged</label><input className={input} type="text" placeholder={usd(subtotal)} value={yourPriceInput} onChange={(e) => setYourPriceInput(e.target.value)} /></div>
                <div><label className={label}>Tax Rate %</label><input className={input} type="number" value={taxRateInput} onChange={(e) => setTaxRateInput(e.target.value)} /></div>
                <div><label className={label}>Total Due</label><div className="rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white">{usd(totalDue)}</div></div>
                <div className="col-span-2"><label className={label}>Notes / Payment Terms</label><textarea className={input + " resize-none"} rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} /></div>
              </div>
              {savings > 0 && <p className="mt-2 text-xs text-emerald-700">This invoice shows the client saving {usd(savings)} off the total value.</p>}
              <div className="mt-3 flex items-start gap-2 text-xs text-slate-500">
                <Info size={14} className="mt-0.5 shrink-0" />
                <span>Tax defaults to 0 percent. Confirm Rhode Island sales tax treatment for media deliverables before relying on it.</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="sticky top-4">
              <button type="button" onClick={handleDownload} disabled={lineItems.length === 0} className="mb-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40">
                <FileDown size={17} /> Download Editable Word Invoice
              </button>
              <div className="max-h-[80vh] overflow-auto rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div dangerouslySetInnerHTML={{ __html: buildInvoiceHTML(invoiceData) }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
