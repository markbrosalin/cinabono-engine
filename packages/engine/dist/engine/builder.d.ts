import { EnginePlugin } from "../plugins";
import { EngineOptionsType } from "../engine/options";
import { CinabonoEngine } from "../engine/engine";
export declare class CinabonoBuilder {
    readonly plugins: EnginePlugin[];
    readonly options: EngineOptionsType;
    private readonly _infra;
    use(...plugins: EnginePlugin[]): this;
    configure(options: Partial<EngineOptionsType>): this;
    build(): Promise<CinabonoEngine>;
}
//# sourceMappingURL=builder.d.ts.map