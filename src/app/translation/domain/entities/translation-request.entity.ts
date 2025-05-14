import { InputType } from '../enums/input-type.enum';
import { OutputType } from '../enums/output-type.enum';
import { TranslationStatus } from '../enums/translation-status.enum';

export class TranslationRequest {
  private id: string;
  private userId: string;
  private inputType: InputType;
  private inputData: string;
  private outputType: OutputType;
  private status: TranslationStatus;
  private createdAt: Date;
  private completedAt?: Date;

  constructor(params: {
    id: string;
    userId: string;
    inputType: InputType;
    inputData: string;
    outputType: OutputType;
  }) {
    this.id         = params.id;
    this.userId     = params.userId;
    this.inputType  = params.inputType;
    this.inputData  = params.inputData;
    this.outputType = params.outputType;
    this.status     = TranslationStatus.PENDING;
    this.createdAt  = new Date();
  }

  startProcessing() {
    this.status = TranslationStatus.PROCESSING;
  }

  completeTranslation() {
    this.status      = TranslationStatus.COMPLETED;
    this.completedAt = new Date();
  }

  failTranslation() {
    this.status      = TranslationStatus.FAILED;
    this.completedAt = new Date();
  }
}
