import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Especialista, Mascotas, MascotasRelations, Persona} from '../models';
import {EspecialistaRepository} from './especialista.repository';
import {PersonaRepository} from './persona.repository';

export class MascotasRepository extends DefaultCrudRepository<
  Mascotas,
  typeof Mascotas.prototype.id,
  MascotasRelations
> {

  public readonly persona: BelongsToAccessor<Persona, typeof Mascotas.prototype.id>;

  public readonly especialistas: HasManyRepositoryFactory<Especialista, typeof Mascotas.prototype.id>;

  public readonly especialista: BelongsToAccessor<Especialista, typeof Mascotas.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('EspecialistaRepository') protected especialistaRepositoryGetter: Getter<EspecialistaRepository>,
  ) {
    super(Mascotas, dataSource);
    this.especialista = this.createBelongsToAccessorFor('especialista', especialistaRepositoryGetter,);
    this.registerInclusionResolver('especialista', this.especialista.inclusionResolver);
    this.especialistas = this.createHasManyRepositoryFactoryFor('especialistas', especialistaRepositoryGetter,);
    this.registerInclusionResolver('especialistas', this.especialistas.inclusionResolver);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
