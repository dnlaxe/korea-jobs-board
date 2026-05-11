import { eq } from "drizzle-orm";
import { db } from "../db/db.js";
import { magicToken } from "../db/schema.js";
import { generate } from "random-words";

export async function createMagicToken(
  email: string,
  sessionId: number,
  expiresAt: Date,
  paymentId?: string | null,
) {
  const token = generate({ exactly: 8, join: "-" });

  const [tokenRow] = await db
    .insert(magicToken)
    .values({
      email,
      sessionId,
      expiresAt,
      paymentId: paymentId ?? null,
      token: token,
    })
    .returning();
  return tokenRow;
}

export async function getSessionIdByToken(token: string) {
  const [session] = await db
    .select()
    .from(magicToken)
    .where(eq(magicToken.token, token));

  return session ?? null;
}
