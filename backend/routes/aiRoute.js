import { Router } from "express";
import {
  aiStatus,
  generateEmailDraft,
  leadSummary,
  salesInsights,
} from "../controllers/aiController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();
router.use(protect);

router.get("/status", aiStatus);
router.post("/lead-summary", leadSummary);
router.post("/generate-email", generateEmailDraft);
router.post("/sales-insights", salesInsights);

export default router;
