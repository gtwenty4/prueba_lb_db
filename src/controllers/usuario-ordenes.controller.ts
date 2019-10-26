import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Usuario,
  Ordenes,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioOrdenesController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/ordenes', {
    responses: {
      '200': {
        description: 'Array of Ordenes\'s belonging to Usuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ordenes)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: Number,
    @param.query.object('filter') filter?: Filter<Ordenes>,
  ): Promise<Ordenes[]> {
    return this.usuarioRepository.ordenes(id).find(filter);
  }

  @post('/usuarios/{id}/ordenes', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ordenes)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Usuario.prototype.idusuario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ordenes, {
            title: 'NewOrdenesInUsuario',
            optional: ['fkusuario']
          }),
        },
      },
    }) ordenes: Omit<Ordenes, 'idorden'>,
  ): Promise<Ordenes> {
    return this.usuarioRepository.ordenes(id).create(ordenes);
  }

  @patch('/usuarios/{id}/ordenes', {
    responses: {
      '200': {
        description: 'Usuario.Ordenes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: Number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ordenes, {partial: true}),
        },
      },
    })
    ordenes: Partial<Ordenes>,
    @param.query.object('where', getWhereSchemaFor(Ordenes)) where?: Where<Ordenes>,
  ): Promise<Count> {
    return this.usuarioRepository.ordenes(id).patch(ordenes, where);
  }

  @del('/usuarios/{id}/ordenes', {
    responses: {
      '200': {
        description: 'Usuario.Ordenes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: Number,
    @param.query.object('where', getWhereSchemaFor(Ordenes)) where?: Where<Ordenes>,
  ): Promise<Count> {
    return this.usuarioRepository.ordenes(id).delete(where);
  }
}
