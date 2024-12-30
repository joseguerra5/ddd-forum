import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment'
import { makeAnswerComment } from 'test/factories/make-answer-comment'

let iMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let sut: DeleteAnswerCommentUseCase

describe('Delete a answer comment', () => {
  beforeEach(() => {
    iMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
    sut = new DeleteAnswerCommentUseCase(iMemoryAnswerCommentRepository)
  })
  it('should be able to delete a answer comment', async () => {

    const newAnswerComment = makeAnswerComment()

    await iMemoryAnswerCommentRepository.create(newAnswerComment)

    await sut.execute({
      authorId: newAnswerComment.authorId.toString(),
      answerCommentId: newAnswerComment.id.toString()
    })


    expect(iMemoryAnswerCommentRepository.items).toHaveLength(0)
  })

  it('not should be able to delete a answer comment with diferent authorId', async () => {


    const newAnswerComment = makeAnswerComment()

    await iMemoryAnswerCommentRepository.create(newAnswerComment)

    await sut.execute({
      authorId: newAnswerComment.authorId.toString(),
      answerCommentId: newAnswerComment.id.toString()
    })

    expect(() => {
      return sut.execute({
        authorId: "diferent-author-id",
        answerCommentId: newAnswerComment.id.toString()
      })
    }).rejects.toBeInstanceOf(Error)

  })
})
