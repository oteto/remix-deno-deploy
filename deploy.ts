import { load } from "https://deno.land/std@0.203.0/dotenv/mod.ts";

await load({ export: true });

const token = Deno.env.get("DENO_DEPLOY_TOKEN");

if (!token) {
  throw new Error("DENO_DEPLOY_TOKEN が設定されていません。");
}

const build = new Deno.Command(Deno.execPath(), {
  args: [
    "task",
    "build",
  ],
  stdout: "piped",
  stderr: "piped",
}).spawn();

const output = await build.output();
await Deno.stdout.write(output.stdout);

const deploy = new Deno.Command(Deno.execPath(), {
  args: [
    "task",
    "deploy:cmd",
  ],
  stdout: "piped",
  stderr: "piped",
}).spawn();
await deploy.stdout.pipeTo(Deno.stdout.writable);
