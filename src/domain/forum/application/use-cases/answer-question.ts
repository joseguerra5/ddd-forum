import { Either, right } from '@/core/either'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answer-repository'

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

type AnswerQuestionUseCaseResponse = Either<null, {
  answer: Answer
}>

export class AnswerQuestionUseCase {
  // dependencias
  constructor(private answersRepository: AnswersRepository) { }
  // ter apenas um metodo, responsabilidade única do solid
  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      authorId: new UniqueEntityId(instructorId),
      content,
      questionId: new UniqueEntityId(questionId),
    })

    await this.answersRepository.create(answer)

    return right({ answer })
  }
}
