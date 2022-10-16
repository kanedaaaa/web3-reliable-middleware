import express, { Request, Response } from "express";
import { main } from "./index";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    main();
    res.status(200).send("working");
});

app.listen(8080, () => {
    console.log("server is running at port 8080")
});