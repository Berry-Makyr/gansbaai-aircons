import { apiVersion, projectId } from "@/sanity/env";

export type SanityMember = {
  id: string;
  name?: string;
  email?: string;
};

/** Confirms a Studio-issued bearer token belongs to this Sanity project. */
export async function getSanityMemberFromToken(
  token: string | undefined
): Promise<SanityMember | null> {
  const value = token?.trim();
  if (!value) return null;

  const response = await fetch(
    `https://${projectId}.api.sanity.io/v${apiVersion}/users/me`,
    {
      headers: { Authorization: `Bearer ${value}` },
      cache: "no-store",
    }
  );

  if (!response.ok) return null;
  const user = (await response.json()) as {
    id?: string;
    name?: string;
    email?: string;
  };
  if (!user?.id) return null;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

export function getBearerToken(request: Request): string | undefined {
  const header = request.headers.get("authorization") || "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match?.[1];
}
