import { InMemoryAnswerRepository } from 'test/repositories/in-memory-answer-repository'
import { DeleteAnswerUseCase } from './delete-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: DeleteAnswerUseCase

describe('Delete a answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswerRepository)
  })
  it('should be able to delete a answer', async () => {

    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId("author-01")
    }, new UniqueEntityId("answer-01"))

    await inMemoryAnswerRepository.create(newAnswer)

    await sut.execute({
      answerId: "answer-01",
      authorId: "author-01"
    })


    expect(inMemoryAnswerRepository.items).toHaveLength(0)
  })

  it('not should be able to delete a answer with diferent authorId', async () => {

    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId("author-01")
    }, new UniqueEntityId("answer-01"))

    console.log(newAnswer)
    await inMemoryAnswerRepository.create(newAnswer)

    expect(() => {
       return sut.execute({
        answerId: "answer-01",
        authorId: "author-02"
      })
    }).rejects.toBeInstanceOf(Error)
  
  })
})
