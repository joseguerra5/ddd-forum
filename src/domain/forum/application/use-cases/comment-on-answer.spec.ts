import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { CommentOnAnswerUseCase } from './comment-on-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let sut: CommentOnAnswerUseCase

describe('Create a answer comment', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
    sut = new CommentOnAnswerUseCase(inMemoryAnswerCommentRepository, inMemoryAnswerRepository)
  })
  it('should be able create a answer comment', async () => {
    await inMemoryAnswerRepository.create(makeAnswer({ authorId: new UniqueEntityId("author-01") }))

    const { answerComment } = await sut.execute({
      authorId: "author-01",
      content: "example-01",
      answerId: inMemoryAnswerRepository.items[0].id.toString()
    })

    expect(answerComment.id).toBeTruthy()
    expect(inMemoryAnswerCommentRepository.items[0].id).toBe(answerComment.id)
  })
})
