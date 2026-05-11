import { Router } from "express";
import {
  showDbCheck,
  showLiveness,
  showReadiness,
} from "./health.controller.js";

const router = Router();

router.get("/health/live", showLiveness);
router.get("/health/ready", showReadiness);

router.get("/db-check", showDbCheck);

export default router;
