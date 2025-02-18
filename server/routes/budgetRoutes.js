import express from "express";
import { createBudegtController, deleteBudegtController, getMyBudgetsController, updateBudegtController } from "../controllers/budgetController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get('/', auth, getMyBudgetsController);
router.post('/create', auth, createBudegtController);
router.put('/update/:id', auth, updateBudegtController);
router.delete('/delete/:id', auth, deleteBudegtController);


export default router;