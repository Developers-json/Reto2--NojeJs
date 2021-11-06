import {Entity, model, property} from '@loopback/repository';

@model()
export class Especialista extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  ID?: string;

  @property({
    type: 'string',
    required: true,
  })
  Nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  Apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  Especialidad: string;


  constructor(data?: Partial<Especialista>) {
    super(data);
  }
}

export interface EspecialistaRelations {
  // describe navigational properties here
}

export type EspecialistaWithRelations = Especialista & EspecialistaRelations;
