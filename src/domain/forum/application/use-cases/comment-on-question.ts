import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionsCommentsRepository } from '../repositories/question-comments-repository'
import { QuestionsRepository } from '../repositories/questions-repository'

interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

interface CommentOnQuestionUseCaseReponse {
  questionComment: QuestionComment
}

export class CommentOnQuestionUseCase {
  // dependencias
  constructor(
    private questionsCommentsRepository: QuestionsCommentsRepository,
    private questionsRepository: QuestionsRepository,
  ) { }
  // ter apenas um metodo, responsabilidade única do solid
  async execute({
    authorId,
    content,
    questionId
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseReponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content
    })

    await this.questionsCommentsRepository.create(questionComment)

    return {
      questionComment
    }
  }
}