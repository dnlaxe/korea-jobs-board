import { Request, Response } from "express";
import {
  getPaymentByPaymentRef,
  markPaymentCaptured,
  markPaymentCancelled,
} from "../../repo/payment.repo.js";
import { submitDrafts } from "../jobs/jobs.services.js";

export async function showDummyPayment(req: Request, res: Response) {
  const paymentRef = String(req.query.paymentRef ?? "");
  if (!paymentRef) return res.status(400).render("error");

  res.render("payments/dummy", {
    paymentRef,
  });
}

export async function completeDummyPayment(req: Request, res: Response) {
  const { paymentRef } = req.body;
  if (!paymentRef) return res.status(400).render("error");

  const payment = await getPaymentByPaymentRef(paymentRef);
  if (!payment || !payment.sessionId) return res.status(404).render("error");

  await markPaymentCaptured(paymentRef);
  const result = await submitDrafts(payment.sessionId);

  if (!result.success) {
    return res.status(500).render("jobs/drafts", {
      actionError: "Something went wrong. Please try again.",
    });
  }

  res.locals.draftsCount = 0;

  return res.render("payments/success", {
    title: "Payment received",
    message: "Your posts were submitted and are now under review.",
    paymentRef,
    link: { href: "/jobs/board", label: "View the board" },
  });
}

export async function cancelDummyPayment(req: Request, res: Response) {
  const { paymentRef } = req.body;
  if (!paymentRef) return res.status(400).render("error");

  await markPaymentCancelled(paymentRef);
  return res.redirect("/jobs/drafts");
}
