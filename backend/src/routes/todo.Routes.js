import {Router} from "express";
import {addTodo,getPost,deletePost,editPost} from "../controllers/todo.Contoller.js";

const router = Router();

router.post("/",addTodo);
router.get("/", getPost);
router.delete("/:id", deletePost);
router.put("/:id", editPost);

export default router;