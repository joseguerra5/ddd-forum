import { AnswersRepository } from '../repositories/answer-repository'


interface DeleteAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

interface DeleteAnswerUseCaseReponse {}

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) { }
  async execute({
    answerId,
    authorId,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseReponse> {
    const answer = await this.answersRepository.findById(answerId)

    if(!answer) {
      throw new Error("Answer not found")
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error("Not alowed")
    }

    await this.answersRepository.delete(answer)

    return {}
  }
}
