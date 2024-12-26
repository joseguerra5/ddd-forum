import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: CreateQuestionUseCase

describe('Create a question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionRepository)
  })
  it('should be able create a question', async () => {
    const { question } = await sut.execute({
      content: 'nova resposta',
      authorId: '01',
      title: 'Nova pergunta',
    })

    expect(question.id).toBeTruthy()
    expect(inMemoryQuestionRepository.items[0].id).toBe(question.id)
  })
})
