import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { EditQuestionUseCase } from './edit-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: EditQuestionUseCase

describe('Edit a question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionRepository)
  })
  it('should be able to edit a question', async () => {

    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId("author-01")
    }, new UniqueEntityId("question-01"))

    await inMemoryQuestionRepository.create(newQuestion)

    const {question} = await sut.execute({
      questionId: "question-01",
      authorId: "author-01",
      content: "example-01",
      title: "example-01",
    })


    expect(inMemoryQuestionRepository.items).toHaveLength(1)
    expect(inMemoryQuestionRepository.items[0]).toMatchObject({     
      content: "example-01",
      title: "example-01",
    })
  })

  it('not should be able to edit a question with diferent authorId', async () => {

    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId("author-01")
    }, new UniqueEntityId("question-01"))

    console.log(newQuestion)
    await inMemoryQuestionRepository.create(newQuestion)

    expect(() => {
       return sut.execute({
        questionId: "question-01",
        authorId: "author-02",
        content: "example-01",
        title: "example-01",
      })
    }).rejects.toBeInstanceOf(Error)
  
  })
})
