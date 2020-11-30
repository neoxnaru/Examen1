import {DefaultCrudRepository} from '@loopback/repository';
import {Producto, ProductoRelations} from '../models';
import {TruchitaDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProductoRepository extends DefaultCrudRepository<
  Producto,
  typeof Producto.prototype.productoId,
  ProductoRelations
> {
  constructor(
    @inject('datasources.truchita') dataSource: TruchitaDataSource,
  ) {
    super(Producto, dataSource);
  }
}
