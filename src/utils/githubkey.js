import { Octokit } from "octokit";

const apiKey = ""

export const octokit = new Octokit({
    auth: apiKey,
})