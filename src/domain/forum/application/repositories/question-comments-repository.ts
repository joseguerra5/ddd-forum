// interface para dizer os metodos que o repositorio tem que ter

import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionComment } from '../../enterprise/entities/question-comment'

export interface QuestionsCommentsRepository {
  create(questionComment: QuestionComment): Promise<void>
  findById(id: string): Promise<QuestionComment | null>
  findManyByQuestionId(questionId: string, params: PaginationParams): Promise<QuestionComment[]>
  delete(questionComment: QuestionComment): Promise<void>

}
