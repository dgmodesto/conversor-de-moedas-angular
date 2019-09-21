import { DataBrPipe } from './data-br.pipe';

describe('DataBrPipe', () => {
  it('create an instance', () => {
    const pipe = new DataBrPipe();
    expect(pipe).toBeTruthy();
  });

  it('deve formatar a data 2019-03-31 para 31-03-2019', () => {
    const pipe = new DataBrPipe();
    expect(pipe.transform('2019-03-31')).toEqual('31/03/2019');
  });
});
