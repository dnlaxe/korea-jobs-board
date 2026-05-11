import { Request, Response } from "express";
import { sql } from "drizzle-orm";
import { db } from "../../db/db.js";
import { isShuttingDown } from "./health.state.js";

export function showLiveness(_req: Request, res: Response) {
  return res.status(200).json({ ok: true });
}

export async function showReadiness(req: Request, res: Response) {
  if (isShuttingDown()) {
    req.log.warn({ reason: "shutting_down" }, "Readiness probe failed");
    return res.status(503).json({ ok: false, reason: "shutting_down" });
  }

  try {
    await db.execute(sql`select 1`);
    return res.status(200).json({ ok: true });
  } catch (err) {
    req.log.warn({ err, reason: "db_unreachable" }, "Readiness probe failed");
    return res.status(503).json({ ok: false, reason: "db_unreachable" });
  }
}

export async function showDbCheck(req: Request, res: Response) {
  req.log.info("Manual DB check requested");
  const result = await db.execute(sql`select now() as now`);
  return res.json(result.rows);
}
