import { Router } from "express";

import auth from "./controller/auth";

import process from "./process/read";
import createProcess from "./process/create";
import deleteProcess from "./process/delete";
import updateProcess from "./process/update";


export const route = Router();

route.get("/processo", auth, process);

route.post("/processo", auth, createProcess);

route.put("/processo/:id", auth, updateProcess);

route.delete("/processo/:id", auth, deleteProcess);