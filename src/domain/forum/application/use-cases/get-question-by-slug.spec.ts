import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { Question } from '../../enterprise/entities/question'
import { Slug } from '../../enterprise/entities/value-objecs/slug'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let sut: GetQuestionBySlugUseCase

describe('Get question by slug', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository)
  })
  it('should be able get a question by slug', async () => {
    const newQuestion = Question.create({
      authorId: new UniqueEntityId(),
      title: "Example question",
      content: "Example content",
      slug: Slug.create("example-question"),
    })

    await inMemoryQuestionRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: "example-question"
    })

    expect(question.id).toBeTruthy()
  })
})
