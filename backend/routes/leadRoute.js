import { Router } from "express";
import {
  createLead,
  deleteLead,
  getLead,
  getLeads,
  reorderLeads,
  updateLead,
} from "../controllers/leadController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();
router.use(protect);

router.patch("/reorder", reorderLeads);
router.route("/").get(getLeads).post(createLead);
router.route("/:id").get(getLead).put(updateLead).delete(deleteLead);

export default router;
