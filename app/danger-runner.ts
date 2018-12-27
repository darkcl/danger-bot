import { join } from "path";
import npmRun from "npm-run";

export class DangerRunner {
  constructor(private ghHost: string, private ghToken: string) {}

  async run(prNumber: string, owner: string, repo: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      npmRun.exec(
        "danger ci",
        {
          cwd: join(__dirname, "../"),
          env: {
            DANGER_FAKE_CI: "YEP",
            DANGER_TEST_REPO: `${owner}/${repo}`,
            DANGER_GITHUB_HOST: this.ghHost,
            DANGER_GITHUB_API_BASE_URL: `https://${this.ghHost}/`,
            DANGER_GITHUB_API_TOKEN: this.ghToken,
            DANGER_TEST_PR: prNumber
          }
        },
        (err, stdout, stderr) => {
          console.log(stdout);
          console.log(stderr);
          if (err) {
            reject(err);
          } else {
            resolve("DangerJS Scan Completed");
          }
        }
      );
    });
  }
}
