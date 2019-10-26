import {DefaultCrudRepository} from '@loopback/repository';
import {Ordenes, OrdenesRelations} from '../models';
import {PgdbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class OrdenesRepository extends DefaultCrudRepository<
  Ordenes,
  typeof Ordenes.prototype.descripcion,
  OrdenesRelations
> {
  constructor(
    @inject('datasources.pgdb') dataSource: PgdbDataSource,
  ) {
    super(Ordenes, dataSource);
  }
}
