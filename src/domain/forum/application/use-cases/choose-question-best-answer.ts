import { Answer } from "../../enterprise/entities/answer";
import { Question } from "../../enterprise/entities/question";
import { AnswersRepository } from "../repositories/answer-repository";
import { QuestionsRepository } from "../repositories/questions-repository";

interface ChooseQuestionBestAnswerAnswerUseCaseRequest {
  authorId: string
  answerId: string
}

interface ChooseQuestionBestAnswerAnswerUseCaseResponse {
  question: Question
}
export class ChooseQuestionBestAnswerAnswerUseCase {
  constructor(
    private answerRepository: AnswersRepository,
    private questionRepository: QuestionsRepository
  ) {}
  async execute({
    answerId,
    authorId
  }: ChooseQuestionBestAnswerAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error("Answer not found.")
    }

    const question = await this.questionRepository.findById(answer.questionId.toString())

    if (!question) {
      throw new Error("Question not found.")
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error("Not Allowed.")
    }

    question.bestAnswerId = answer.id

    await this.questionRepository.save(question)

    return {question}
  }
}