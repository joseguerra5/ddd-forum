import { Either, left, right } from '@/core/either'
import { Question, QuestionProps } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResouceNotFoundError } from './errors/resource-not-found-error'

interface EditQuestionUseCaseRequest {
  questionId: string
  authorId: string
  title: string
  content: string
}

type EditQuestionUseCaseReponse = Either<NotAllowedError | ResouceNotFoundError, {
  question: Question
}>

export class EditQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) { }
  async execute({
    questionId,
    authorId,
    content,
    title
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseReponse> {
    const question = await this.questionsRepository.findById(questionId)

    if(!question) {
      return left(new ResouceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    question.title = title
    question.content = content

    await this.questionsRepository.save(question)

    return right({
      question
    })
  }
}
