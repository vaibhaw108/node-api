const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const _ = require("lodash");
const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());
//app.use(express.cors());

const PORT = 3001;

app.get("/jobs/:id", async (req, res) => {
	const id = req.params.id;
	let content;

	try {
		content = await fs.readFile(`data/jobs/${id}.txt`, "utf-8");
	} catch (err) {
        console.log(err)
		return res.sendStatus(404);
	}

	res.json({
		content
	});
});

app.post("/jobs", async (req, res) => {
	const id = uuid();
	const post_id = req.body.id;

	if (!post_id) {
		return res.sendStatus(400);
	}
	await fs.mkdir("data/jobs", { recursive: true });
	await fs.writeFile(`data/jobs/${id}.txt`, JSON.stringify(req.body));

	res.status(201).json({
		id: id
	});
});

app.get("/movies/:id", async (req, res) => {
	const id = req.params.id;
	let content;

	try {
		content = await fs.readFile(`data/movies/${id}.txt`, "utf-8");
	} catch (err) {
        console.log(err)
		return res.sendStatus(404);
	}

	res.json({
		content
	});
});

app.post("/movies", async (req, res) => {
	const id = uuid();
	const post_id = req.body.id;
	const post_page = req.body.page;

    //console.log(JSON.stringify(req.body));
	if (!post_id) {
		return res.sendStatus(400);
	}
	await fs.mkdir("data/movies", { recursive: true });
	await fs.writeFile(`data/movies/${id}.txt`, JSON.stringify(req.body));

	res.status(201).json({
		id: id
	});
});

app.get("/comments/:id", async (req, res) => {
	const id = req.params.id;
	let content;

	try {
		content = await fs.readFile(`data/comments/${id}.txt`, "utf-8");
	} catch (err) {
		return res.sendStatus(404);
	}

	res.json({
		content: content
	});
});

app.post("/comments", async (req, res) => {
	const id = uuid();
	const content = req.body.content;

	if (!content) {
		return res.sendStatus(400);
	}

	await fs.mkdir("data/comments", { recursive: true });
	await fs.writeFile(`data/comments/${id}.txt`, content);

	res.status(201).json({
		id: id
	});
});

app.get("/test", (req, res) => {
	const tops = ["Black", "White", "Orange", "Navy"];
	const jeans = ["Grey", "Dark Grey", "Black", "Navy"];
	const shoes = ["White", "Grey", "Black"];

	res.json({
		top: _.sample(tops),
		jeans: _.sample(jeans),
		shoes: _.sample(shoes)
	});
});

app.listen(PORT, () => console.log("API Server is running at PORT:"+PORT+"..."));

/*
function content_json_format (key1, str1, key2, str2 ){
    let concatenated = "{\n\t\""+key1+"\": \""+str1+"\",\n"+
    "\t\""+key2+"\": \""+str2+"\"\n}";
    return concatenated;
} */
