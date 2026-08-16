/**
 * Shared secret check for content + IndexNow APIs.
 * Authorization: Bearer <CONTENT_API_SECRET>
 */
export function assertContentSecret(request: Request): Response | null {
  const secret = process.env.CONTENT_API_SECRET;
  if (!secret) {
    return Response.json(
      { error: "CONTENT_API_SECRET not configured" },
      { status: 503 },
    );
  }

  const header = request.headers.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token || token !== secret) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}
