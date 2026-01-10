import { CinabonoBuilder } from "@cnbn/engine";
import { WorkerHandler } from "@cnbn/engine-worker";

const Cinabono = await new CinabonoBuilder().build();

const handler = new WorkerHandler(Cinabono);

handler.listen();
