export class TranslationResult {
  constructor(
    public id: string,
    public requestId: string,
    public outputData: string,
    public accuracyScore: number,
    public processingTimeMs: number
  ) {}
}
