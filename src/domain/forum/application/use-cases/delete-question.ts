import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface DeleteQuestionUseCaseRequest {
  questionId: string
  authorId: string
}

interface DeleteQuestionUseCaseReponse {}

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) { }
  async execute({
    questionId,
    authorId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseReponse> {
    const question = await this.questionsRepository.findById(questionId)

    if(!question) {
      throw new Error("Question not found")
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error("Not alowed")
    }

    await this.questionsRepository.delete(question)

    return {}
  }
}
