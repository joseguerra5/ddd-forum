import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface GetQuestionBySlugUseCaseRequest {
  slug: string
}

interface GetQuestionBySlugUseCaseReponse {
  question: Question
}

export class GetQuestionBySlugUseCase {
  // dependencias
  constructor(private questionsRepository: QuestionsRepository) { }
  // ter apenas um metodo, responsabilidade única do solid
  async execute({
    slug
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseReponse> {
    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) {
      throw new Error('Question not found')
    }

    return {
      question
    }
  }
}
