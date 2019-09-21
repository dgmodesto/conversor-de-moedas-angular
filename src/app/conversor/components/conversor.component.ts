import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MoedaService, ConversorService } from '../services';
import { Moeda, ConversaoResponse, Conversao } from '../Models';

@Component({
  selector: 'app-conversor',
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.scss'],
  providers: [ConversorService]
})
export class ConversorComponent implements OnInit {
  private moedas: Moeda[];
  private possuiErro: boolean;
  private conversaoResponse: ConversaoResponse;
  private conversao: Conversao;

  @ViewChild('conversaoForm', { static: true }) conversaoForm: NgForm;

  constructor(
    private moedaService: MoedaService,
    private conversorService: ConversorService
  ) {}

  ngOnInit() {
    this.moedas = this.moedaService.listarTodas();
    this.init();
  }

  /**
   * Efetua a chamada para a conversão dos valores
   * @return void
   */
  init(): void {
    this.conversao = new Conversao('EUR', 'BRL', null);
    this.possuiErro = false;
  }

  /**
   * Efetua a chamada para a conversão dos vlaor
   */
  converter(): void {
    if (this.conversaoForm.form.valid) {
      // alert('Convertendo: ' + JSON.stringify(this.conversao));
      this.conversorService
        .converter(this.conversao)
        .subscribe(
          response => (this.conversaoResponse = response),
          error => (this.possuiErro = true)
        );
    }
  }
}
