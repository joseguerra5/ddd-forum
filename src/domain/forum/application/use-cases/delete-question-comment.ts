import { QuestionsCommentsRepository } from '../repositories/question-comments-repository'

interface DeleteQuestionCommentUseCaseRequest {
  questionCommentId: string
  authorId: string
}

interface DeleteQuestionCommentUseCaseReponse { }

export class DeleteQuestionCommentUseCase {
  constructor(private questionsCommentsRepository: QuestionsCommentsRepository) { }
  async execute({
    questionCommentId,
    authorId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseReponse> {
    const questionComment = await this.questionsCommentsRepository.findById(questionCommentId)

    if (!questionComment) {
      throw new Error("Question not found")
    }

    if (authorId !== questionComment.authorId.toString()) {
      throw new Error("Not alowed")
    }

    await this.questionsCommentsRepository.delete(questionComment)

    return {}
  }
}
