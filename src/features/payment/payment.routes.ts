import {
  cancelDummyPayment,
  completeDummyPayment,
  showDummyPayment,
} from "./payment.controller.js";
import { Router, type RequestHandler } from "express";
import { isMockPaymentsEnabled } from "../../config/config.js";

const requireMockPayments: RequestHandler = (_req, res, next) => {
  if (!isMockPaymentsEnabled) return res.status(404).render("error");
  next();
};

const router = Router();

router.get("/dummy-payment", requireMockPayments, showDummyPayment);
router.post("/dummy-payment/complete", requireMockPayments, completeDummyPayment);
router.post("/dummy-payment/cancel", requireMockPayments, cancelDummyPayment);

export default router;
