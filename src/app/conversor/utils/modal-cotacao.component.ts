import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConversaoResponse, Conversao } from '../Models';
import { ConversorService } from '../services';

@Component({
  selector: 'app-modal-cotacao',
  templateUrl: './modal-cotacao.component.html',
  styleUrls: ['./modal-cotacao.component.scss'],
  providers: [ConversorService]
})
export class ModalCotacaoComponent implements OnInit {
  @Input() id: string;
  @Input() conversaoResponse: ConversaoResponse;
  @Input() conversao: Conversao = new Conversao();
  @Output() confirm: EventEmitter<any> = new EventEmitter<any>();

  constructor(private conversorService: ConversorService) {}

  ngOnInit() {}

  novaConsulta() {
    this.confirm.emit();
  }

  get valorConvertido(): string {
    if (this.conversaoResponse === undefined) {
      return '0';
    }

    return (
      this.conversao.valor *
      this.conversaoResponse.rates[this.conversao.moedaPara]
    ).toFixed(2);
  }

  get cotacaoPara(): number {
    return this.conversorService.cotacaoPara(
      this.conversaoResponse,
      this.conversao
    );
  }

  get cotacaoDe(): string {
    return this.conversorService.cotacaoDe(
      this.conversaoResponse,
      this.conversao
    );
  }

  get dataCotacao(): string {
    return this.conversorService.dataCotacao(this.conversaoResponse);
  }
}
