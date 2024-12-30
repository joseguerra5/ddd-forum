import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionsCommentsRepository } from '../repositories/question-comments-repository'

interface FetchQuestionCommentsUseCaseRequest {
  questionId: string
  page: number
}

interface FetchQuestionCommentsUseCaseReponse {
  questionsComments: QuestionComment[]
}

export class FetchQuestionCommentsUseCase {
  // dependencias
  constructor(private questionsCommentsRepository: QuestionsCommentsRepository) { }
  // ter apenas um metodo, responsabilidade única do solid
  async execute({
    page,
    questionId
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseReponse> {
    const questionsComments = await this.questionsCommentsRepository.findManyByQuestionId(questionId, { page })

    return {
      questionsComments
    }
  }
}
