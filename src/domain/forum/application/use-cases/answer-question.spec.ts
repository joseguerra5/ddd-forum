import { InMemoryAnswerRepository } from "test/repositories/in-memory-answer-repository"
import { AnswerQuestionUseCase } from "./answer-question"

let inMemoryAnswerRepository: InMemoryAnswerRepository
let sut: AnswerQuestionUseCase

describe('Create a answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)
  })
  it('should be able create a answer', async () => {
    const { answer } = await sut.execute({
      content: 'nova resposta',
      instructorId: '01',
      questionId: '01',
    })

    expect(answer.id).toBeTruthy()
    expect(inMemoryAnswerRepository.items[0].id).toBe(answer.id)
  })
})
