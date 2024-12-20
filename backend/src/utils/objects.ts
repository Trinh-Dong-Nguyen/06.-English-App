export class ResponseObject {
  public readonly message: string;
  public readonly result: Record<string, any>;

  private constructor(message: string = '', result: Record<string, any> = {}) {
    this.message = message;
    this.result = result;
  }

  public static create(message?: string, result?: Record<string, any>) {
    return new ResponseObject(message, result);
  }
}
