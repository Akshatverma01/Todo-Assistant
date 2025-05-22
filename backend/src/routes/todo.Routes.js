import {Router} from "express";
import {addTodo,getPost,deletePost} from "../controllers/todo.Contoller.js";

const router = Router();

router.post("/",addTodo);
router.get("/", getPost);
router.delete("/:id", deletePost);

export default router;