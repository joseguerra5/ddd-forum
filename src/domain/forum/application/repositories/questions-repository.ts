// interface para dizer os metodos que o repositorio tem que ter

import { Question } from '../../enterprise/entities/question'

export interface QuestionsRepository {
  findBySlug(slug: string): Promise<Question | null>
  create(question: Question): Promise<void>
}
