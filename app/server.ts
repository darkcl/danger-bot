const WebhooksApi = require("@octokit/webhooks");
const dotenv = require("dotenv");
dotenv.config();

import { DangerRunner } from "./danger-runner";

const danger = new DangerRunner(
  process.env.GHE_HOST || "api.github.com",
  process.env.GITHUB_TOKEN
);

import express from "express";
import bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const port = 8080;

const webhooks = new WebhooksApi({
  secret: process.env.WEBHOOK_SECRET || "mysecret"
});

const prMethod = [
  "pull_request.assigned",
  "pull_request.unassigned",
  "pull_request.review_requested",
  "pull_request.review_request_removed",
  "pull_request.labeled",
  "pull_request.unlabeled",
  "pull_request.opened",
  "pull_request.edited",
  "pull_request.closed",
  "pull_request.reopened",
  "pull_request.synchronize"
];

webhooks.on(prMethod, async ({ id, name, payload }) => {
  const { number } = payload.pull_request;
  const { name: repo } = payload.repository;
  const { login: owner } = payload.repository.owner;
  try {
    await danger.run(`${number}`, owner, repo);
  } catch (e) {}
});

app.get("/ping", async (req, res) => {
  res.send("ok");
});

app.use(webhooks.middleware);

app.listen(port, () => console.log(`DangerJS Bot listening on port ${port}!`));
