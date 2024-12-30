import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { DeleteAnswerUseCase } from './delete-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryQuestionCommentRepository } from 'test/repositories/in-memory-question-comments-repository'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'
import { makeQuestion } from 'test/factories/make-question'
import { makeQuestionComment } from 'test/factories/make-question-comment'

let iMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
let sut: DeleteQuestionCommentUseCase

describe('Delete a question comment', () => {
  beforeEach(() => {
    iMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
    sut = new DeleteQuestionCommentUseCase(iMemoryQuestionCommentRepository)
  })
  it('should be able to delete a question comment', async () => {

    const newQuestionComment = makeQuestionComment()

    await iMemoryQuestionCommentRepository.create(newQuestionComment)

    await sut.execute({
      authorId: newQuestionComment.authorId.toString(),
      questionCommentId: newQuestionComment.id.toString()
    })


    expect(iMemoryQuestionCommentRepository.items).toHaveLength(0)
  })

  it('not should be able to delete a question comment with diferent authorId', async () => {


    const newQuestionComment = makeQuestionComment()

    await iMemoryQuestionCommentRepository.create(newQuestionComment)

    await sut.execute({
      authorId: newQuestionComment.authorId.toString(),
      questionCommentId: newQuestionComment.id.toString()
    })

    expect(() => {
      return sut.execute({
        authorId: "diferent-author-id",
        questionCommentId: newQuestionComment.id.toString()
      })
    }).rejects.toBeInstanceOf(Error)

  })
})
