import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface DeleteAnswerCommentUseCaseRequest {
  answerCommentId: string
  authorId: string
}

interface DeleteAnswerCommentUseCaseReponse { }

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) { }
  async execute({
    answerCommentId,
    authorId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseReponse> {
    const answerComment = await this.answerCommentsRepository.findById(answerCommentId)

    if (!answerComment) {
      throw new Error("Question not found")
    }

    if (authorId !== answerComment.authorId.toString()) {
      throw new Error("Not alowed")
    }

    await this.answerCommentsRepository.delete(answerComment)

    return {}
  }
}
