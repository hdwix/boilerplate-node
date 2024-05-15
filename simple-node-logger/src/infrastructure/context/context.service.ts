import { Injectable, Scope } from "@nestjs/common";
import { generateTraceId } from "src/constants";

@Injectable({ scope: Scope.REQUEST })
export class ContextService {
  private _traceId?: string;

  get traceId(): string {
    if (!this._traceId) {
      this._traceId = generateTraceId(); // Generates a new trace ID if none is set
    }
    return this._traceId;
  }
}
