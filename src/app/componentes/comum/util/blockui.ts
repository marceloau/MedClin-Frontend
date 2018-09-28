import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import Pace from '../../../../assets/bower_components/PACE/pace.min.js';

@Injectable()
export class BlockUI {

  documento = $(document);

  start() {
    this.documento.ajaxStart(
      function() {
        Pace.restart();
      }
    );
  }
}
