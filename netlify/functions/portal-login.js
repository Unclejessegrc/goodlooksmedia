const jsonHeaders = {
  "Content-Type": "application/json",
};

const getEnv = (name) => {
  const netlifyValue = globalThis.Netlify?.env?.get?.(name);
  return netlifyValue ?? process.env[name] ?? "";
};

const jsonResponse = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: jsonHeaders,
  });

export const config = {
  method: ["POST"],
};

export default async (request) => {
  if (request.method !== "POST") {
    return jsonResponse({ ok: false }, 405);
  }

  const businessEmail = getEnv("BUSINESS_EMAIL");
  const businessPassword = getEnv("BUSINESS_PASSWORD");

  if (!businessEmail || !businessPassword) {
    return jsonResponse({ ok: false }, 500);
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ ok: false }, 400);
  }

  const email = typeof payload?.email === "string" ? payload.email.trim().toLowerCase() : "";
  const password = typeof payload?.password === "string" ? payload.password : "";

  if (email === businessEmail.trim().toLowerCase() && password === businessPassword) {
    return jsonResponse({ ok: true });
  }

  return jsonResponse({ ok: false }, 401);
};
