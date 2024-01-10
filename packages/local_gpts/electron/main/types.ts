import { BaseProjectError } from "@balmacefa/function_tool_kit";

export class Electron_Error extends BaseProjectError {
    constructor(message: string, public data: any = {}) {
        super(message);
        this.name = Electron_Error.name;
        this.data = data;
    }
}