import { Either, right } from '@/core/either'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { Attatchment } from '../../enterprise/entities/attachment'
import { QuestionAttatchment } from '../../enterprise/entities/question-attachment'

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
  attachmentsIds: string[]
}

type CreateQuestionUseCaseReponse = Either<null, {
  question: Question
}> 

export class CreateQuestionUseCase {
  // dependencias
  constructor(private questionsRepository: QuestionsRepository) { }
  // ter apenas um metodo, responsabilidade única do solid
  async execute({
    authorId,
    content,
    title,
    attachmentsIds
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseReponse> {
    const question = Question.create({
      content,
      authorId: new UniqueEntityId(authorId),
      title
    })
    const questionAttachments = attachmentsIds.map(attachmentId => {
      return QuestionAttatchment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        questionId: question.id
      })
    })

    question.attachments = questionAttachments

    await this.questionsRepository.create(question)

    return right({
      question
    })
  }
}
