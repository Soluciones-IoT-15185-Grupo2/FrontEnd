import { Component } from '@angular/core';
import { TranslationAppService } from '../../application/translation-app.service';
import { TranslationRequest } from '../../domain/entities/translation-request.entity';
import { InputType } from '../../domain/enums/input-type.enum';
import { OutputType } from '../../domain/enums/output-type.enum';

@Component({
  selector: 'app-live-translate',
  templateUrl: './live-translate.component.html',
  standalone: false,
  styleUrl: './live-translate.component.css'
})
export class LiveTranslateComponent {
  inputData = '';
  resultText = '';
  loading = false;

  constructor(private app: TranslationAppService) { }

  onTranslate() {
    const req = new TranslationRequest({
      id: this.generateUuId(),
      userId: 'usuario-123',
      inputType: InputType.TEXT,
      inputData: this.inputData,
      outputType: OutputType.TEXT
    });
    this.loading = true;
    this.app.processTextTranslation(req)
      .subscribe(res => {
        this.resultText = res.outputData;
        this.loading    = false;
      }, _ => this.loading = false);
  }

  private generateUuId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
