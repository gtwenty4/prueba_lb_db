import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Usuario, UsuarioRelations, Ordenes} from '../models';
import {PgdbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {OrdenesRepository} from './ordenes.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.nombre,
  UsuarioRelations
> {

  public readonly ordenes: HasManyRepositoryFactory<Ordenes, typeof Usuario.prototype.idusuario>;

  constructor(
    @inject('datasources.pgdb') dataSource: PgdbDataSource, @repository.getter('OrdenesRepository') protected ordenesRepositoryGetter: Getter<OrdenesRepository>,
  ) {
    super(Usuario, dataSource);
    this.ordenes = this.createHasManyRepositoryFactoryFor('ordenes', ordenesRepositoryGetter,);
  }
}
