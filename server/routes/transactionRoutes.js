import express from "express";
import auth from "../middleware/auth.js";
import { createTransactionController, deleteTransactionController, getMyTransactionsController, updateTransactionController } from "../controllers/transactionsController.js";

const router = express.Router();

router.get('/', auth, getMyTransactionsController);
router.post('/create', auth, createTransactionController);
router.put('/update/:id', auth, updateTransactionController);
router.delete('/delete/:id', auth, deleteTransactionController);


export default router;