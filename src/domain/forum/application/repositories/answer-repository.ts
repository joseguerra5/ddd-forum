// interface para dizer os metodos que o repositorio tem que ter

import { Answer } from '../forum/enterprise/entities/answer'

export interface AnswersRepository {
  create(answer: Answer): Promise<void>
}
