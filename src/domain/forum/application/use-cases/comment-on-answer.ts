import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { AnswersRepository } from '../repositories/answer-repository'

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface CommentOnAnswerUseCaseReponse {
  answerComment: AnswerComment
}

export class CommentOnAnswerUseCase {
  // dependencias
  constructor(
    private answerCommentsRepository: AnswerCommentsRepository,
    private answerRepository: AnswersRepository,
  ) { }
  // ter apenas um metodo, responsabilidade única do solid
  async execute({
    authorId,
    content,
    answerId
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseReponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content
    })

    await this.answerCommentsRepository.create(answerComment)

    return {
      answerComment
    }
  }
}
