import { Directive, HostListener, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: '[appNumero]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: NumeroDirective,
      multi: true
    }
  ]
})
export class NumeroDirective implements ControlValueAccessor {
  onTouched: any;
  onChange: any;

  constructor(private el?: ElementRef) {}

  /**
   * Implementa evetnod okeyup para o elemento da diretiva
   * @param $event
   */
  @HostListener('keyup', ['$event'])
  onkeyup($event: any) {
    let valor = $event.target.value;
    const posDecimais = valor.indexOf('.');

    valor = valor.replace(/[\D]/g, '');

    if (posDecimais > 0) {
      valor = valor.substr(0, posDecimais) + '.' + valor.substr(posDecimais);
    }

    $event.target.value = valor;
    this.onChange(valor);
  }

  /**
   * Registra função a ser chamada para atualizar valor na model
   * @params valor
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * Registra função a ser chamada para atualizar valor na model para evento touched
   * @params fn
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Obtém o valor contido na model
   * @params value
   */
  writeValue(value: any): void {
    this.el.nativeElement.value = value;
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }
}
