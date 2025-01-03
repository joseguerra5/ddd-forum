// interface para dizer os metodos que o repositorio tem que ter

import { PaginationParams } from "@/core/repositories/pagination-params"
import { Answer } from "../../enterprise/entities/answer"


export interface AnswersRepository {
  findById(id: string): Promise<Answer | null>
  findManyByQuestiondId(questionId: string, params: PaginationParams): Promise<Answer[]>
  create(answer: Answer): Promise<void>
  save(answer: Answer): Promise<void>
  delete(answer: Answer): Promise<void>
}
