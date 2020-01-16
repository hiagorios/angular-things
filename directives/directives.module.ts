import { NgModule } from '@angular/core';

import { DebounceKeyupDirective } from './debounce-keyup.directive';
import { FormSubmitValidationMsgDirective } from './formsubmit-validation-msg.directive';
import { FormControlValidationMsgDirective } from './formcontrol-validation-msg.directive';
import { DotdotdotDirective } from './dotdotdot.directive';

@NgModule({
  declarations: [
    DebounceKeyupDirective,
    FormSubmitValidationMsgDirective,
    FormControlValidationMsgDirective,
    DotdotdotDirective
  ],
  imports: [
  ],
  exports: [
    DebounceKeyupDirective,
    FormSubmitValidationMsgDirective,
    FormControlValidationMsgDirective,
    DotdotdotDirective
  ],
  entryComponents: [
  ],
  providers: [
  ]
})
export class DirectivesModule { }
