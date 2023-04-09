import { FilterCliente } from './filter-cliente.pipe';

describe('PipeCliente', () => {
  it('create an instance', () => {
    const pipe = new FilterCliente();
    expect(pipe).toBeTruthy();
  });
});
