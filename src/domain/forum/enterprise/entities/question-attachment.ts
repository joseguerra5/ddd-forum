import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

interface QuestionAttatchmentProps {
  questionId: UniqueEntityId
  attachmentId: UniqueEntityId
}
export class QuestionAttatchment extends Entity<QuestionAttatchmentProps> {
  get questionId() {
    return this.props.questionId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: QuestionAttatchmentProps, id?: UniqueEntityId) {
    const attatchment = new QuestionAttatchment(props, id)

    return attatchment
  }
}