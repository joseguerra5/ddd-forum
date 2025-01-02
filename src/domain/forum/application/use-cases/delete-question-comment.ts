import { Either, left, right } from '@/core/either'
import { QuestionsCommentsRepository } from '../repositories/question-comments-repository'
import { ResouceNotFoundError } from './errors/resource-not-found-error'
import { NotAllowedError } from './errors/not-allowed-error'

interface DeleteQuestionCommentUseCaseRequest {
  questionCommentId: string
  authorId: string
}

type DeleteQuestionCommentUseCaseReponse = Either<NotAllowedError | ResouceNotFoundError, {}>

export class DeleteQuestionCommentUseCase {
  constructor(private questionsCommentsRepository: QuestionsCommentsRepository) { }
  async execute({
    questionCommentId,
    authorId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseReponse> {
    const questionComment = await this.questionsCommentsRepository.findById(questionCommentId)

    if (!questionComment) {
      return left(new ResouceNotFoundError())
      throw new Error("Question not found")
    }

    if (authorId !== questionComment.authorId.toString()) {
      return left(new NotAllowedError())
      throw new Error("Not alowed")
    }

    await this.questionsCommentsRepository.delete(questionComment)

    return right({})
  }
}
