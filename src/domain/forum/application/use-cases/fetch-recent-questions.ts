import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface FetchRecentQuestionUseCaseRequest {
  page: number
}

interface FetchRecentQuestionUseCaseReponse {
  questions: Question[]
}

export class FetchRecentQuestionUseCase {
  // dependencias
  constructor(private questionsRepository: QuestionsRepository) { }
  // ter apenas um metodo, responsabilidade única do solid
  async execute({
    page
  }: FetchRecentQuestionUseCaseRequest): Promise<FetchRecentQuestionUseCaseReponse> {
    const questions = await this.questionsRepository.findManyRecents({page})

    return {
      questions
    }
  }
}
