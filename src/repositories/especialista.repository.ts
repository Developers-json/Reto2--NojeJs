import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Especialista, EspecialistaRelations, Mascotas} from '../models';
import {MascotasRepository} from './mascotas.repository';

export class EspecialistaRepository extends DefaultCrudRepository<
  Especialista,
  typeof Especialista.prototype.id,
  EspecialistaRelations
> {

  public readonly mascotas: HasManyRepositoryFactory<Mascotas, typeof Especialista.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('MascotasRepository') protected mascotasRepositoryGetter: Getter<MascotasRepository>,
  ) {
    super(Especialista, dataSource);
    this.mascotas = this.createHasManyRepositoryFactoryFor('mascotas', mascotasRepositoryGetter,);
    this.registerInclusionResolver('mascotas', this.mascotas.inclusionResolver);
  }
}
