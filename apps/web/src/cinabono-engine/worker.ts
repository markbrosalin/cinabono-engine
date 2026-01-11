import { CinabonoBuilder } from "@cnbn/engine";
import { CinabonoWorker } from "@cnbn/engine-worker";

const Cinabono = await new CinabonoBuilder().build();

const handler = new CinabonoWorker(Cinabono);

handler.listen();
