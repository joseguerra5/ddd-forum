import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
}

interface CreateQuestionUseCaseReponse {
  question: Question
}

export class CreateQuestionUseCase {
  // dependencias
  constructor(private questionsRepository: QuestionsRepository) { }
  // ter apenas um metodo, responsabilidade única do solid
  async execute({
    authorId,
    content,
    title
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseReponse> {
    const question = Question.create({
      content,
      authorId: new UniqueEntityId(authorId),
      title
    })

    await this.questionsRepository.create(question)

    return {
      question
    }
  }
}
